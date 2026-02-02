'use client';

import { useState, useId } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerSeller } from '@/actions/auth';
import styles from './page.module.css';

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    shopName: '',
    bio: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const nameId = useId();
  const shopNameId = useId();
  const bioId = useId();
  const locationId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerSeller({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        shopName: formData.shopName,
        bio: formData.bio || undefined,
        location: formData.location || undefined,
      });

      if (!result.success) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      // Auto sign in after registration
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        // Account created but auto-login failed, redirect to login
        router.push('/login?registered=true');
        return;
      }

      // Redirect to seller listings
      router.push('/seller/listings');
      router.refresh();
    } catch {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header} role="banner">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} aria-label="Handcrafted Haven - Home">
            <svg 
              className={styles.logoIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7.5 3 4 6.5 4 10c0 2 1 3.5 2 4.5V20h12v-5.5c1-1 2-2.5 2-4.5 0-3.5-3.5-7-8-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-3M15 20v-3M12 3v4M8 10h8" />
            </svg>
            <span className={styles.logoText}>Handcrafted Haven</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.registerCard}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Create Seller Account</h1>
            <p className={styles.subtitle}>
              Start selling your handcrafted creations today
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.error} role="alert">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Account Information</legend>
              
              <div className={styles.formGroup}>
                <label htmlFor={nameId} className={styles.label}>
                  Your Name <span className={styles.required}>*</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your full name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={emailId} className={styles.label}>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  id={emailId}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor={passwordId} className={styles.label}>
                    Password <span className={styles.required}>*</span>
                  </label>
                  <input
                    id={passwordId}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Min 8 characters"
                    required
                    autoComplete="new-password"
                    disabled={isLoading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={confirmPasswordId} className={styles.label}>
                    Confirm Password <span className={styles.required}>*</span>
                  </label>
                  <input
                    id={confirmPasswordId}
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Re-enter password"
                    required
                    autoComplete="new-password"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Shop Information</legend>
              
              <div className={styles.formGroup}>
                <label htmlFor={shopNameId} className={styles.label}>
                  Shop Name <span className={styles.required}>*</span>
                </label>
                <input
                  id={shopNameId}
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your shop or brand name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={locationId} className={styles.label}>
                  Location
                </label>
                <input
                  id={locationId}
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="City, State/Country"
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={bioId} className={styles.label}>
                  About Your Shop
                </label>
                <textarea
                  id={bioId}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Tell customers about yourself and your craft..."
                  rows={4}
                  disabled={isLoading}
                />
              </div>
            </fieldset>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg 
                    className={styles.spinner} 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeDasharray="31.4 31.4"
                    />
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Seller Account'
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>Already have an account?</span>
          </div>

          <div className={styles.loginLink}>
            <Link href="/login" className={styles.loginBtn}>
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerContent}>
          <p>© {new Date().getFullYear()} Handcrafted Haven. Supporting artisans worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
