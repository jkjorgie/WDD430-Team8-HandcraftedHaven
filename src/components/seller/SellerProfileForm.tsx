"use client";

import { useState } from "react";
import styles from "./SellerProfileForm.module.css";

export type SellerProfileData = {
  name: string;
  bio: string;
  location: string;
};

type SellerProfileFormProps = {
  initialData?: SellerProfileData;
  onSubmit: (data: SellerProfileData) => void;
  submitLabel?: string;
};

export function SellerProfileForm({
  initialData = { name: "", bio: "", location: "" },
  onSubmit,
  submitLabel,
}: SellerProfileFormProps) {
  const [formData, setFormData] = useState<SellerProfileData>(initialData);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="bio">
          Bio
        </label>
        <textarea
          className={styles.textarea}
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <input
          className={styles.input}
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.actions}>
        <button className="btn btn-primary" type="submit">
          {submitLabel ?? "Save Profile"}
        </button>
      </div>
    </form>
  );
}

export default SellerProfileForm;
