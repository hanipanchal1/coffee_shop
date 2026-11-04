import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────
//  SEO & Dynamic Document Title Utility
//  Project Name: Coffee Shop
// ─────────────────────────────────────────────────────────────

const BRAND_NAME = "Coffee Shop";
const DEFAULT_TITLE = `${BRAND_NAME} | Handcrafted Brews & Artisanal Dining`;
const DEFAULT_DESCRIPTION =
  "Welcome to Coffee Shop. Enjoy handcrafted specialty coffee, freshly baked artisanal pastries, gourmet dining, and easy table reservations in a warm, cozy atmosphere.";

/**
 * Updates document.title and Open Graph / Twitter meta tags dynamically.
 * @param {Object} options
 * @param {string} [options.title] - Page title (e.g. "Our Menu")
 * @param {string} [options.description] - SEO meta description
 * @param {string} [options.keywords] - Comma-separated keywords
 * @param {string} [options.ogImage] - Social share image URL
 */
export const setSEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  ogImage,
} = {}) => {
  // Format title: e.g. "Our Menu | Coffee Shop" or default
  const formattedTitle = title
    ? `${title.trim()} | ${BRAND_NAME}`
    : DEFAULT_TITLE;

  document.title = formattedTitle;

  // Helper function to update or create <meta> tags in <head>
  const updateMeta = (selector, keyAttr, keyValue, content) => {
    if (!content) return;
    let meta = document.querySelector(selector);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(keyAttr, keyValue);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  };

  // Standard SEO
  updateMeta('meta[name="description"]', "name", "description", description);
  if (keywords) {
    updateMeta('meta[name="keywords"]', "name", "keywords", keywords);
  }

  // Open Graph (Facebook / WhatsApp / LinkedIn)
  updateMeta('meta[property="og:title"]', "property", "og:title", formattedTitle);
  updateMeta('meta[property="og:description"]', "property", "og:description", description);
  updateMeta('meta[property="og:site_name"]', "property", "og:site_name", BRAND_NAME);
  if (ogImage) {
    updateMeta('meta[property="og:image"]', "property", "og:image", ogImage);
  }

  // Twitter Card
  updateMeta('meta[name="twitter:title"]', "name", "twitter:title", formattedTitle);
  updateMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
  if (ogImage) {
    updateMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
  }
};

/**
 * React Hook for dynamic SEO on page mount & update.
 */
export const useSEO = ({ title, description, keywords, ogImage } = {}) => {
  useEffect(() => {
    setSEO({ title, description, keywords, ogImage });
  }, [title, description, keywords, ogImage]);
};

/**
 * React Component wrapper for declarative SEO.
 * Example: <SEO title="Our Menu" description="..." />
 */
const SEO = ({ title, description, keywords, ogImage }) => {
  useSEO({ title, description, keywords, ogImage });
  return null;
};

export default SEO;

