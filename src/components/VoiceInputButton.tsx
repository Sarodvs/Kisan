import React, { useState, useRef, useEffect } from 'react';
import {
  isSpeechRecognitionSupported,
  processVoiceInput,
  VoiceContext,
} from '../lib/voiceAssistant';

interface VoiceInputButtonProps {
  context: VoiceContext;
  appLanguage?: string;
  onPopulate: (candidateFields: Record<string, any>) => void;
  label?: string;
}

export type VoiceStatus = 'idle' | 'listening' | 'processing' | 'success' | 'unsupported' | 'error';

export function VoiceInputButton({
  context,
  appLanguage = 'en',
  onPopulate,
  label = 'Fill form with Voice',
}: VoiceInputButtonProps) {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef<any>(null);

  const supported = isSpeechRecognitionSupported();

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  const startListening = () => {
    if (!supported) {
      setStatus('unsupported');
      setErrorMessage('Voice recognition is not supported in this browser. Please type directly.');
      return;
    }

    setErrorMessage('');
    setTranscript('');
    setStatus('listening');

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    const bcpMap: Record<string, string> = {
      ml: 'ml-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      en: 'en-IN',
    };
    recognition.lang = bcpMap[appLanguage] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event: any) => {
      const text = event.results[0]?.[0]?.transcript || '';
      setTranscript(text);
      setStatus('processing');

      try {
        const { candidateFields, unresolved } = await processVoiceInput(
          context,
          text,
          appLanguage
        );

        if (Object.keys(candidateFields).length > 0) {
          onPopulate(candidateFields);
          setStatus('success');
          setTimeout(() => setStatus('idle'), 4000);
        } else {
          setStatus('error');
          setErrorMessage(
            unresolved.length > 0
              ? `Could not map: ${unresolved.join(', ')}`
              : 'Could not extract valid fields from speech. Please review and type manually.'
          );
        }
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Error processing speech extraction.');
      }
    };

    recognition.onerror = (event: any) => {
      setStatus('error');
      if (event.error === 'not-allowed') {
        setErrorMessage('Microphone permission denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'no-speech') {
        setErrorMessage('No speech detected. Please click to try again.');
      } else {
        setErrorMessage(`Voice error: ${event.error || 'Failed to capture audio.'}`);
      }
    };

    recognition.onend = () => {
      if (status === 'listening') {
        setStatus('idle');
      }
    };

    try {
      recognition.start();
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to start microphone.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setStatus('idle');
  };

  if (!supported) {
    return (
      <div className="voice-assistant-container unsupported">
        <button
          type="button"
          className="voice-assistant-btn disabled"
          title="Speech Recognition is not supported in this browser. Please type directly into the form fields."
          disabled
        >
          <span className="mic-icon">🎙️</span> {label} (Browser Unsupported)
        </button>
      </div>
    );
  }

  return (
    <div className={`voice-assistant-container status-${status}`}>
      {status === 'listening' ? (
        <button
          type="button"
          className="voice-assistant-btn listening pulsing"
          onClick={stopListening}
        >
          <span className="mic-icon pulse">🔴</span> Stop Listening
        </button>
      ) : (
        <button
          type="button"
          className={`voice-assistant-btn ${status}`}
          onClick={startListening}
          disabled={status === 'processing'}
        >
          <span className="mic-icon">🎙️</span>{' '}
          {status === 'processing' ? 'Processing Voice...' : label}
        </button>
      )}

      {status === 'listening' && (
        <p className="voice-hint listening-hint">
          <span>Listening in {appLanguage.toUpperCase()}... Speak naturally!</span>
        </p>
      )}

      {status === 'processing' && (
        <p className="voice-hint processing-hint">
          <span>Extracting form fields securely...</span>
        </p>
      )}

      {status === 'success' && (
        <p className="voice-hint success-hint">
          <span>✅ Proposed fields highlighted in green! Please review before saving.</span>
        </p>
      )}

      {status === 'error' && errorMessage && (
        <p className="voice-hint error-hint" role="alert">
          <span>⚠️ {errorMessage}</span>
        </p>
      )}

      {transcript && status !== 'idle' && (
        <div className="voice-transcript-preview">
          <small>Transcribed Speech: "{transcript}"</small>
        </div>
      )}
    </div>
  );
}
