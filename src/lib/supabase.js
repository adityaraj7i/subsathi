import { createClient } from '@supabase/supabase-js';

// Read Supabase environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are provided
export const isSupabaseConfigured = () => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.startsWith('https://') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.length > 20
  );
};

// Initialize Supabase client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// SUPABASE DATABASE SYNC HELPERS
// ==========================================

/**
 * Fetch all products from Supabase
 */
export const fetchProductsFromSupabase = async () => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchProducts error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetchProducts exception:', err);
    return null;
  }
};

/**
 * Upsert / Save a product to Supabase
 */
export const saveProductToSupabase = async (product) => {
  if (!supabase || !product) return null;
  try {
    const payload = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: Number(product.price) || 0,
      original_price: Number(product.originalPrice) || 0,
      stock: typeof product.stock === 'number' ? product.stock : 50,
      rating: Number(product.rating) || 5.0,
      total_sales: Number(product.totalSales) || 0,
      is_flash_sale: !!product.isFlashSale,
      is_best_seller: !!product.isBestSeller,
      is_combo: !!product.isCombo,
      short_description: product.shortDescription || '',
      long_description: product.longDescription || '',
      logo_url: product.logoUrl || product.image || '',
      plans: product.plans || [],
      faqs: product.faqs || [],
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('products')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.warn('Supabase saveProduct error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase saveProduct exception:', err);
    return null;
  }
};

/**
 * Delete a product from Supabase
 */
export const deleteProductFromSupabase = async (productId) => {
  if (!supabase || !productId) return false;
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.warn('Supabase deleteProduct error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase deleteProduct exception:', err);
    return false;
  }
};

/**
 * Fetch store settings from Supabase
 */
export const fetchStoreConfigFromSupabase = async () => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .eq('id', 'main_config')
      .single();

    if (error) {
      console.warn('Supabase fetchStoreConfig error:', error.message);
      return null;
    }
    return data?.config || null;
  } catch (err) {
    console.warn('Supabase fetchStoreConfig exception:', err);
    return null;
  }
};

/**
 * Save store settings to Supabase
 */
export const saveStoreConfigToSupabase = async (config) => {
  if (!supabase || !config) return null;
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .upsert(
        {
          id: 'main_config',
          config,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (error) {
      console.warn('Supabase saveStoreConfig error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase saveStoreConfig exception:', err);
    return null;
  }
};

/**
 * Insert a customer order to Supabase
 */
export const insertOrderToSupabase = async (order) => {
  if (!supabase || !order) return null;
  try {
    const payload = {
      order_id: order.orderId,
      customer_name: order.customerName,
      customer_email: order.customerEmail || '',
      customer_phone: order.customerPhone || '',
      items: order.items || [],
      total_amount: Number(order.totalAmount) || 0,
      subtotal: Number(order.subtotal) || 0,
      discount_amount: Number(order.discountAmount) || 0,
      coupon_code: order.couponCode || '',
      payment_method: order.paymentMethod || 'whatsapp',
      transaction_id: order.transactionId || '',
      status: order.status || 'Pending Verification',
      customer_notes: order.customerNotes || '',
      date: order.date || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.warn('Supabase insertOrder error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase insertOrder exception:', err);
    return null;
  }
};

/**
 * Fetch orders from Supabase (for Admin)
 */
export const fetchOrdersFromSupabase = async () => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchOrders error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetchOrders exception:', err);
    return null;
  }
};

/**
 * Update order status in Supabase
 */
export const updateOrderStatusInSupabase = async (orderId, status) => {
  if (!supabase || !orderId) return false;
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('order_id', orderId);

    if (error) {
      console.warn('Supabase updateOrderStatus error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase updateOrderStatus exception:', err);
    return false;
  }
};

/**
 * Insert support ticket to Supabase
 */
export const insertTicketToSupabase = async (ticket) => {
  if (!supabase || !ticket) return null;
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        ticket_id: ticket.id,
        customer_name: ticket.name,
        customer_phone: ticket.phone,
        customer_email: ticket.email || '',
        order_id: ticket.orderId || '',
        category: ticket.category || 'General',
        subject: ticket.subject || '',
        message: ticket.message || '',
        status: ticket.status || 'Open'
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase insertTicket error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase insertTicket exception:', err);
    return null;
  }
};

export default supabase;
