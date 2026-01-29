'use client';

import { useState, useId, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/seller/listings';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Redirect to seller listings on successful login
      router.push(callbackUrl);
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
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Seller Login</h1>
            <p className={styles.subtitle}>
              Sign in to manage your products and profile
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

            <div className={styles.formGroup}>
              <label htmlFor={emailId} className={styles.label}>
                Email Address
              </label>
              <input
                id={emailId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="you@example.com"
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={passwordId} className={styles.label}>
                Password
              </label>
              <input
                id={passwordId}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>New to selling?</span>
          </div>

          <div className={styles.createAccount}>
            <p>Create a seller profile to start listing your handcrafted products.</p>
            <Link href="/register" className={styles.createBtn}>
              Create Seller Account
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

// Loading fallback for Suspense
function LoginLoading() {
  return (
    <div className={styles.page}>
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
      <main className={styles.main}>
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Seller Login</h1>
            <p className={styles.subtitle}>Loading...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
