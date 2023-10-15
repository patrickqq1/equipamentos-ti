export interface Equipment{
    id: number;
    name: string;
    description: string;
    acquisition_date: Date;
    value: number;
    status: "disponivel" | "em uso" | "em manutenção";
    added_by: number;
    created_at: Date;
    updated_at: Date;
}