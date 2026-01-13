export default class LocaleHelper {
    static getModuleKey() {
        return 'freight_forwarding.order_management';
    }

    static getPageTitle() {
        return `${this.getModuleKey()}.page_title`;
    }

    static getOrderNo() {
        return `${this.getModuleKey()}.order_no`;
    }

    static getCustomerName() {
        return `${this.getModuleKey()}.customer_name`;
    }

    static getOrderType() {
        return `${this.getModuleKey()}.order_type`;
    }

    static getOrderStatus() {
        return `${this.getModuleKey()}.order_status`;
    }

    static getBookingDate() {
        return `${this.getModuleKey()}.booking_date`;
    }

    static getOrigin() {
        return `${this.getModuleKey()}.origin`;
    }

    static getDestination() {
        return `${this.getModuleKey()}.destination`;
    }

    static getCreateTime() {
        return `${this.getModuleKey()}.create_time`;
    }
    
    static getAction() {
        return 'common.operation'; // Reuse common if possible, or define new
    }

    static getButtonAdd() {
        return 'common.add';
    }
    
    static getButtonEdit() {
        return 'common.edit';
    }

    static getButtonDelete() {
        return 'common.delete';
    }

    static getButtonSave() {
        return 'common.save';
    }

    static getButtonCancel() {
        return 'common.cancel';
    }

    static getButtonSubmit() {
        return 'common.submit';
    }
}
