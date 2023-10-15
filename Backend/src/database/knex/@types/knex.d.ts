import { Equipment } from "../../models/Equipments";
import { EquipmentMov } from "../../models/Equipments_mov";
import { Users } from "../../models/Users";

declare module 'knex/types/tables' {
    interface Tables {
        "users": Users;
        "equipments": Equipment;
        "equipment_movements": EquipmentMov;
    }
}
