export interface EquipmentMov {
  id: number;
  equipment_id: number;
  user_taken_id: number;
  user_placed_id: number;
  movement_date: Date;
  movement_type: "Retirada" | "Devolução" | "Manutenção";
}
