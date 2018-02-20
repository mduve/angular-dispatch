export interface Stock {
    id?: number;
    branchId?: number;

    branch?:string;
    number?:string;
    due_date?:string; //timestamp
    loss_type?:string;
    status?:string;
    pickup_location?:string;
    zip_code?:string;
    county?:string;
    city?:string;
    state?:string;
    model_year?:number;
    model_make?:string;
    model_name?:string;
    priority?:string;
    salvage_provider?:string;

    provider_name?:string;
    towable?:boolean;
    damage?:string;
    stock_address?:string;
    tower?:string;

    storage_end?:string; //timestamp
    total_payment_amount?:number;
    total_hauling_amount?:number;
    payment_type?:string;
    checks_payable_to?:string;
    dispatch_note?:string;
    destination?:string;
    tow_zone?:number;
    mileage?:string;
    tow_type?:string;

    lat: number;
    lng: number;
    draggable:boolean;
    selectable:boolean;
    address:string;

}
