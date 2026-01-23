const prefix = 'freight_forwarding.milestone_tracking';

export const MilestoneTrackingLocale = {
    // Tracking Overview
    getTrackingOverviewTitle() {
        return `${prefix}.tracking_overview.title`;
    },
    getWaybillNumber() {
        return `${prefix}.tracking_overview.waybill_number`;
    },
    getCustomer() {
        return `${prefix}.tracking_overview.customer`;
    },
    getStatus() {
        return `${prefix}.tracking_overview.status`;
    },
    getRoute() {
        return `${prefix}.tracking_overview.route`;
    },
    getProgress() {
        return `${prefix}.tracking_overview.progress`;
    },
    
    // Milestone Config
    getMilestoneConfigTitle() {
        return `${prefix}.milestone_config.title`;
    },
    getMilestoneName() {
        return `${prefix}.milestone_config.milestone_name`;
    },
    getTriggerCondition() {
        return `${prefix}.milestone_config.trigger_condition`;
    },
    getNotificationSettings() {
        return `${prefix}.milestone_config.notification_settings`;
    },

    // Realtime Tracking
    getRealtimeTrackingTitle() {
        return `${prefix}.realtime_tracking.title`;
    },
    getCurrentLocation() {
        return `${prefix}.realtime_tracking.current_location`;
    },
    getEstimatedArrival() {
        return `${prefix}.realtime_tracking.estimated_arrival`;
    },

    // Exception Alert
    getExceptionAlertTitle() {
        return `${prefix}.exception_alert.title`;
    },
    getAlertType() {
        return `${prefix}.exception_alert.alert_type`;
    },
    getSeverity() {
        return `${prefix}.exception_alert.severity`;
    },
    getAlertTime() {
        return `${prefix}.exception_alert.alert_time`;
    },

    // Customer Notification
    getCustomerNotificationTitle() {
        return `${prefix}.customer_notification.title`;
    },
    getTemplateType() {
        return `${prefix}.customer_notification.template_type`;
    },
    getNotificationMethod() {
        return `${prefix}.customer_notification.notification_method`;
    },

    // Tracking Report
    getTrackingReportTitle() {
        return `${prefix}.tracking_report.title`;
    },
    getReportType() {
        return `${prefix}.tracking_report.report_type`;
    },
    getOnTimeRate() {
        return `${prefix}.tracking_report.on_time_rate`;
    },
    getExceptionRate() {
        return `${prefix}.tracking_report.exception_rate`;
    },

    // Interface Management
    getInterfaceManagementTitle() {
        return `${prefix}.interface_management.title`;
    },
    getInterfaceName() {
        return `${prefix}.interface_management.interface_name`;
    },
    getInterfaceType() {
        return `${prefix}.interface_management.interface_type`;
    },
    getLastSync() {
        return `${prefix}.interface_management.last_sync`;
    }
};
