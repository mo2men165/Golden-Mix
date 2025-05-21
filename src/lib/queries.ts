// src/lib/queries.ts
import { client } from '@/sanity/client';
import { Project } from '@/types/project';
import { Partner } from '@/types/partner';
import { ContactInfo } from '@/types';

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    nameEn,
    nameAr,
    slug,
    image,
    location,
    projectDescriptionEN,
    projectDescriptionAR,
    order,
    category,
    client
  }`;
  
  return client.fetch<Project[]>(query);
}

export async function getPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner"] | order(order asc, _createdAt desc) {
    _id,
    name,
    nameAr,
    logo,
    descriptionEn,
    descriptionAr,
    order
  }`;
  
  return client.fetch<Partner[]>(query);
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const query = `*[_type == "contactInfo"][0] {
    _id,
    phoneNumber1,
    phoneNumber2,
    phoneNumber3,
    email,
    addressEn,
    addressAr
  }`;
  
  return client.fetch<ContactInfo>(query);
}
