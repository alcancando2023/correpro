/**
 * Types representing data states for Corre PRO
 */

export interface DeliveryDay {
  id: string;
  date: string; // ISO String (YYYY-MM-DD)
  earnings: number;
  deliveries: number;
  fuelCost: number;
  hoursWorked: number;
  notes?: string;
  mileage?: number;
}

export interface UserProfile {
  name: string;
  dailyGoal: number;
  isPremium: boolean;
  vehicleType: 'moto' | 'bike' | 'car';
  monthlyGoal: number;
}

export interface MaintenanceRecord {
  id: string;
  description: string;
  date: string;
  cost: number;
  type: 'oleo' | 'pneu' | 'freio' | 'combustivel' | 'outro';
}
