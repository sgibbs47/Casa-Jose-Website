import { db } from "./db";
import {
  menuItems,
  reservations,
  type MenuItem,
  type InsertMenuItem,
  type Reservation,
  type InsertReservation
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  seedMenu(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems);
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [newReservation] = await db.insert(reservations).values(reservation).returning();
    return newReservation;
  }

  async seedMenu(): Promise<void> {
    const existing = await this.getMenuItems();
    if (existing.length > 0) return;

    const items: InsertMenuItem[] = [
      {
        name: "Huevos con Chorizo",
        description: "Traditional Spanish scrambled eggs with chorizo sausage",
        price: 7500,
        category: "Starters",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/2f/b0/huevos-con-chorizo-buenisimos.jpg"
      },
      {
        name: "Camarones al Ajillo",
        description: "Shrimp sautéed with garlic, olive oil, and Mediterranean herbs",
        price: 9500,
        category: "Starters",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0e/be/d7/casa-jose-cerca-del-puerto.jpg"
      },
      {
        name: "Sepia Frita",
        description: "Crispy fried squid with fresh lemon and alioli",
        price: 8500,
        category: "Starters",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/93/casa-jose.jpg"
      },
      {
        name: "Dorada Entera a la Sal",
        description: "Whole grilled sea bream, salt-baked with Mediterranean vegetables",
        price: 16500,
        category: "Mains",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/61/casa-jose.jpg"
      },
      {
        name: "Mero a la Parrilla",
        description: "Grilled grouper with seasonal vegetables and lemon butter",
        price: 17500,
        category: "Mains",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0c/1b/casa-jose.jpg"
      },
      {
        name: "Lenguado Meunière",
        description: "Sole fillet pan-fried with brown butter, capers, and fresh herbs",
        price: 15000,
        category: "Mains",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/93/casa-jose.jpg"
      },
      {
        name: "Plato Combinado Casa Jose",
        description: "Selection of fresh fish and seafood with Mediterranean sides",
        price: 22000,
        category: "Mains",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0e/be/d7/casa-jose-cerca-del-puerto.jpg"
      },
      {
        name: "Flan Casero",
        description: "Classic Spanish crème caramel with cinnamon",
        price: 4500,
        category: "Desserts",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/2f/b0/huevos-con-chorizo-buenisimos.jpg"
      },
      {
        name: "Fruta del Tiempo",
        description: "Fresh seasonal fruits served chilled",
        price: 5000,
        category: "Desserts",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/61/casa-jose.jpg"
      },
      {
        name: "Vino de Casa Blanco",
        description: "Local white wine, crisp and refreshing with seafood",
        price: 8000,
        category: "Drinks",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0c/1b/casa-jose.jpg"
      },
      {
        name: "Cerveza Marroquí",
        description: "Ice-cold local Moroccan beer",
        price: 4500,
        category: "Drinks",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0e/be/d7/casa-jose-cerca-del-puerto.jpg"
      },
      {
        name: "Té de Menta Fresco",
        description: "Traditional Moroccan mint tea, served hot or iced",
        price: 3000,
        category: "Drinks",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/93/casa-jose.jpg"
      }
    ];

    await db.insert(menuItems).values(items);
  }
}

export const storage = new DatabaseStorage();
