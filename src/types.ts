/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export interface VehicleRequestFormData {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  accidentDate: string;
  accidentLocation: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleRegistration: string;
  rideshareRequired: boolean;
  insuranceCompany: string;
  claimNumber: string;
  repairerDetails: string;
  // Documents would be File objects in a real form
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}
