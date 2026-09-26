import { supabase } from './supabase';
import type {
  EquipmentListing,
  StorageListing,
  JobPosting,
  JobApplication,
  ServiceRequest,
  Review,
  CommunityMessage,
  Notification,
  GovernmentScheme,
} from '../types/database';

// ============================================================
// 1. PROFILES API
// ============================================================
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Parameters<typeof supabase.from<'profiles'>['update']>[0]>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================================
// 2. EQUIPMENT MARKETPLACE API
// ============================================================
export async function fetchEquipmentListings(category?: string) {
  let query = supabase
    .from('equipment_listings')
    .select('*, owner:profiles(*)')
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as (EquipmentListing & { owner: any })[];
}

export async function createEquipmentListing(listing: Omit<EquipmentListing, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('equipment_listings')
    .insert(listing as any)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================================
// 3. STORAGE LISTINGS API
// ============================================================
export async function fetchStorageListings(type?: string) {
  let query = supabase
    .from('storage_listings')
    .select('*, owner:profiles(*)')
    .gt('available_capacity_tons', 0)
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('storage_type', type as any);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as (StorageListing & { owner: any })[];
}

export async function createStorageListing(listing: Omit<StorageListing, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('storage_listings')
    .insert(listing as any)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================================
// 4. JOB POSTINGS & APPLICATIONS API
// ============================================================
export async function fetchJobPostings(status: string = 'open') {
  const { data, error } = await supabase
    .from('job_postings')
    .select('*, farmer:profiles(*)')
    .eq('status', status as any)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as (JobPosting & { farmer: any })[];
}

export async function createJobPosting(posting: Omit<JobPosting, 'id' | 'workers_hired' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('job_postings')
    .insert(posting as any)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function applyForJob(jobId: string, workerId: string, notes?: string) {
  const { data, error } = await supabase
    .from('job_applications')
    .insert({
      job_id: jobId,
      worker_id: workerId,
      notes: notes || null,
      status: 'pending',
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateJobApplicationStatus(applicationId: string, status: 'accepted' | 'rejected' | 'withdrawn') {
  const { data, error } = await supabase
    .from('job_applications')
    .update({ status } as any)
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================================
// 5. SERVICE REQUESTS & BOOKINGS API
// ============================================================
export async function createServiceRequest(request: Omit<ServiceRequest, 'id' | 'status' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('service_requests')
    .insert({
      ...request,
      status: 'pending',
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateServiceRequestStatus(requestId: string, status: 'confirmed' | 'completed' | 'cancelled') {
  const { data, error } = await supabase
    .from('service_requests')
    .update({ status } as any)
    .eq('id', requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchUserRequests(userId: string) {
  const { data, error } = await supabase
    .from('service_requests')
    .select('*, requester:profiles!requester_id(*), provider:profiles!provider_id(*)')
    .or(`requester_id.eq.${userId},provider_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ============================================================
// 6. REVIEWS & COMMUNITY FORUM API
// ============================================================
export async function fetchUserReviews(targetUserId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, reviewer:profiles!reviewer_id(*)')
    .eq('target_user_id', targetUserId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createReview(review: Omit<Review, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review as any)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchCommunityMessages(channel: 'farmer_forum' | 'worker_forum' | 'general' = 'general') {
  const { data, error } = await supabase
    .from('community_messages')
    .select('*, sender:profiles(*)')
    .eq('channel', channel)
    .order('created_at', { ascending: true })
    .limit(100);

  if (error) throw error;
  return data;
}

export async function sendCommunityMessage(senderId: string, channel: 'farmer_forum' | 'worker_forum' | 'general', content: string, mediaUrl?: string) {
  const { data, error } = await supabase
    .from('community_messages')
    .insert({
      sender_id: senderId,
      channel,
      content,
      media_url: mediaUrl || null,
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================================
// 7. GOVERNMENT SCHEMES & GEMINI ADVISOR API
// ============================================================
export async function fetchGovernmentSchemes(category?: string) {
  let query = supabase.from('government_schemes').select('*');
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as GovernmentScheme[];
}

export async function consultSchemeAdvisor(profile: any, queryText: string) {
  const { data, error } = await supabase.functions.invoke('scheme-advisor', {
    body: {
      profile,
      query: queryText,
    },
  });

  if (error) throw error;
  return data;
}

