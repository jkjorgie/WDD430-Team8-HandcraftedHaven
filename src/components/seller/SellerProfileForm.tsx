"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./SellerProfileForm.module.css";

export type SellerProfileData = {
  name: string;
  bio: string;
  location: string;
};

type SellerProfileFormProps = {
  initialData?: SellerProfileData;
  action: (prevState: any, formData: FormData) => Promise<any>;
  submitLabel?: string;
};

export function SellerProfileForm({
  initialData = { name: "", bio: "", location: "" },
  action,
  submitLabel,
}: SellerProfileFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(action, {});

  // Redirect on success
  useEffect(() => {
    if (state.success) {
      router.push("/seller/listings");
    }
  }, [state.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          defaultValue={initialData.name}
          required
        />
        {state.errors?.name && (
          <p className={styles.error}>{state.errors.name[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="bio">
          Bio
        </label>
        <textarea
          className={styles.textarea}
          id="bio"
          name="bio"
          defaultValue={initialData.bio}
          required
        />
        {state.errors?.bio && (
          <p className={styles.error}>{state.errors.bio[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <input
          className={styles.input}
          id="location"
          name="location"
          defaultValue={initialData.location}
          required
        />
        {state.errors?.location && (
          <p className={styles.error}>{state.errors.location[0]}</p>
        )}
      </div>

      {state.errors?._form && (
        <p className={styles.error}>{state.errors._form[0]}</p>
      )}

      <div className={styles.actions}>
        <button className="btn btn-primary" type="submit">
          {submitLabel ?? "Save Profile"}
        </button>
      </div>
    </form>
  );
}

export default SellerProfileForm;
