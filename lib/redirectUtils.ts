/**
 * Utility functions for handling authentication redirects
 */

/**
 * Creates a login URL with the current page as return URL
 * @param returnUrl - Optional custom return URL, defaults to current page
 * @returns Login URL with return parameter
 */
export function createLoginUrl(returnUrl?: string): string {
  const url = returnUrl || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/');
  return `/login?returnUrl=${encodeURIComponent(url)}`;
}

/**
 * Creates a register URL with the current page as return URL
 * @param returnUrl - Optional custom return URL, defaults to current page
 * @returns Register URL with return parameter
 */
export function createRegisterUrl(returnUrl?: string): string {
  const url = returnUrl || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/');
  return `/register?returnUrl=${encodeURIComponent(url)}`;
}

/**
 * Gets the return URL from query params or defaults to dashboard
 * @param searchParams - URLSearchParams object or URL search string
 * @returns The return URL
 */
export function getReturnUrl(searchParams: URLSearchParams | string): string {
  const params = typeof searchParams === 'string' ? new URLSearchParams(searchParams) : searchParams;
  return params.get('returnUrl') || '/dashboard';
}

/**
 * Redirects to the appropriate URL based on return parameter
 * @param router - Next.js router instance
 * @param defaultUrl - Default URL if no return URL is specified (defaults to '/dashboard')
 */
export function redirectToReturnUrl(router: any, defaultUrl: string = '/dashboard'): void {
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    const returnUrl = getReturnUrl(searchParams);
    router.push(returnUrl);
  } else {
    router.push(defaultUrl);
  }
}