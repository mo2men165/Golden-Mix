import { client } from '@/sanity/client';
import { Page, Service, Project, Category, Settings } from '@/types';

// Fetch site settings
export async function getSettings(): Promise<Settings> {
  return client.fetch(`*[_type == "settings"][0]`);
}

// Fetch a page by slug
export async function getPageBySlug(slug: string): Promise<Page> {
  return client.fetch(`
    *[_type == "page" && slug.current == $slug][0]
  `, { slug });
}

// Fetch all services
export async function getAllServices(): Promise<Service[]> {
  return client.fetch(`
    *[_type == "service"] | order(title.en asc)
  `);
}

// Fetch a service by slug
export async function getServiceBySlug(slug: string): Promise<Service> {
  return client.fetch(`
    *[_type == "service" && slug.current == $slug][0]
  `, { slug });
}

// Fetch all projects
export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(`
    *[_type == "project"] | order(completedAt desc)
  `);
}

// Fetch a project by slug
export async function getProjectBySlug(slug: string): Promise<Project> {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0]{
      ...,
      category->
    }
  `, { slug });
}

// Fetch projects by category
export async function getProjectsByCategory(categoryId: string): Promise<Project[]> {
  return client.fetch(`
    *[_type == "project" && references($categoryId)] | order(completedAt desc)
  `, { categoryId });
}

// Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] | order(title.en asc)
  `);
}