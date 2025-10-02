import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == 'product' && slug.current == $slug] | order(name asc) [0]`
  );
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by slug", error);
  }
};

export const getAllCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(
    `*[_type=="category"] | order(name desc)`
  );
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching all categories", error);

    return [];
  }
};

export const getAllBlogs = async () => {
  const BLOGS_QUERY = defineQuery(
    `*[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      titleImage,
      smallDescription,
      publishedAt,
      tags,
      relatedProducts[]->{
        _id,
        title
      }
    }`
  );
  try {
    const blogs = await sanityFetch({
      query: BLOGS_QUERY,
    });
    return blogs.data || [];
  } catch (error) {
    console.error("Error fetching all blogs", error);
    return [];
  }
};

// ✅ ⬇️ NEW: Get a single blog post by slug
// ✅ Get a single blog post by slug
export const getBlogBySlug = async (slug: string) => {
  const BLOG_BY_SLUG_QUERY = defineQuery(
    `*[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      titleImage {
        asset -> {
          url,
          metadata {
            dimensions
          }
        },
        alt,
        hotspot,
        crop
      },
      smallDescription,
      content,
      publishedAt,
      tags
    }`
  );
  try {
    const blog = await sanityFetch({
      query: BLOG_BY_SLUG_QUERY,
      params: { slug },
    });
    return blog?.data || null;
  } catch (error) {
    console.error("Error fetching blog by slug", error);
    return null;
  }
};

// Add to your existing query file
export const getOrderById = async (orderId: string) => {
  const ORDER_BY_ID_QUERY = defineQuery(
    `*[_type == 'order' && orderId == $orderId][0]{
      _id,
      orderId,
      clerkUserId,
      customerEmail,
      customerName,
      items[]{
        product->{
          _id,
          name,
          slug,
          price,
          images
        },
        quantity,
        price,
        name,
        image
      },
      totalAmount,
      status,
      paymentStatus,
      paystackReference,
      paystackTransactionId,
      shippingAddress,
      orderDate,
      paidAt
    }`
  );

  try {
    const order = await sanityFetch({
      query: ORDER_BY_ID_QUERY,
      params: { orderId },
    });
    return order?.data || null;
  } catch (error) {
    console.error("Error fetching order by ID", error);
    return null;
  }
};

export const getOrdersByEmail = async (email: string) => {
  const ORDERS_BY_EMAIL_QUERY = defineQuery(
    `*[_type == 'order' && customerEmail == $email] | order(orderDate desc){
      _id,
      orderId,
      clerkUserId,
      customerEmail,
      customerName,
      items[]{
        product->{
          _id,
          name,
          slug,
          price,
          images
        },
        quantity,
        price,
        name,
        image
      },
      totalAmount,
      status,
      paymentStatus,
      paystackReference,
      shippingAddress,
      orderDate,
      paidAt
    }`
  );

  try {
    const orders = await sanityFetch({
      query: ORDERS_BY_EMAIL_QUERY,
      params: { email },
    });
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching orders by email", error);
    return [];
  }
};

export const getOrdersByClerkUserId = async (clerkUserId: string) => {
  const ORDERS_BY_CLERK_USER_ID_QUERY = defineQuery(
    `*[_type == 'order' && clerkUserId == $clerkUserId] | order(orderDate desc){
      _id,
      orderId,
      clerkUserId,
      customerEmail,
      customerName,
      items[]{
        product->{
          _id,
          name,
          slug,
          price,
          images
        },
        quantity,
        price,
        name,
        image
      },
      totalAmount,
      status,
      paymentStatus,
      paystackReference,
      shippingAddress,
      orderDate,
      paidAt
    }`
  );

  try {
    const orders = await sanityFetch({
      query: ORDERS_BY_CLERK_USER_ID_QUERY,
      params: { clerkUserId },
    });
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching orders by Clerk user ID", error);
    return [];
  }
};
