export interface EquipmentMov {
  id: number;
  equipment_id: number;
  reason: string;
  quantity_out: number;
  quantity_in: number;
  movement_date: Date;
  movement_type: "Retirada" | "Acrescimo";
  user_id: number;
}
