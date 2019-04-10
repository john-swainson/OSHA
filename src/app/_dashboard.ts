export const dashboardItems: any={
    'OSHA':[
        // Top
        {
            'url': '/',
            'name': 'WEEKLY TASKS DUE',
            'icon': 'icon-user-follow',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6  col-md-15',
            'bg_color': 'bg-success',
        },
        {
            'url': '/',
            'name': 'MONTHLY TASKS DUE',
            'icon': 'icon-basket-loaded',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6 col-md-15',
            'bg_color': 'bg-warning',
        },
        {
            'url': '/',
            'name': 'EXPOSURE AND INJURIES',
            'icon': 'icon-pie-chart',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6 col-md-15',
            'bg_color': 'bg-primary'
        },
        {
            'url': '/',
            'name': 'YEARLY TRAININGS DUE',
            'icon': 'icon-speedometer',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6 col-md-15',
            'bg_color': 'bg-danger'
        },
        {
            'url': '/',
            'name': 'COMPLIANCE TASKS DUE',
            'icon': 'icon-speech',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6 col-md-15',
            'bg_color': 'bg-info',
        },
        // Left
        {
            'url': '/',
            'name': 'Last OSHA Manual Update',
            'icon': 'fa fa-fire fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/ic_post_exposure_management',
            'name': 'Post Exposure Management',
            'icon': 'fa fa-code-fork fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/ic_preventing_transmission',
            'name': 'HBV-Preventing Transmission',
            'icon': 'fa fa-code-fork fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/ic_engineering_controls',
            'name': 'Perform Engineering Controls',
            'icon': 'fa fa-users fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/ic_contact_dermatitis',
            'name': 'Contact and Latex Allergy',
            'icon': 'fa fa-lock fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/ic_records_maintenance',
            'name': 'Records Maintenance',
            'icon': 'fa fa-circle fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/facility',
            'name': 'Facilites',
            'icon': 'fa fa-code-fork fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/hipaa_contact',
            'name': 'Employees',
            'icon': 'fa fa-users fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/safety_data_sheet',
            'name': 'Safety Data Sheet',
            'icon': 'fa fa-exclamation-triangle fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
         // Right
         {
            'url': '/ic_instrument_processing',
            'name': 'Instrument Processing',
            'icon': 'fa fa-bank fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_work_practice',
            'name': 'Work Practice Controls',
            'icon': 'fa fa-sign-in fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_prep_packaging',
            'name': 'Prep and Packaging',
            'icon': 'fa fa-check-square-o fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_unwrapped_instruments',
            'name': 'Unwrapped Instruments',
            'icon': 'fa fa-star fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_implantable_devices',
            'name': 'Implantable Devices',
            'icon': 'fa fa-star-o fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_sterilization_monitoring',
            'name': 'Sterilization Monitoring',
            'icon': 'fa fa-bank fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_sterilization_disinfection',
            'name': 'Sterilization Disinfection Patient Items',
            'icon': 'fa fa-sign-in fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_managing_surfaces',
            'name': 'Managing Environmental Surfaces',
            'icon': 'fa fa-check-square-o fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_regulated_waste',
            'name': 'Regulated Medical Waste',
            'icon': 'fa fa-star fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_extracted_teeth',
            'name': 'Extracted Teeth',
            'icon': 'fa fa-star-o fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_dental_quality',
            'name': 'Dental Unit Waterlines, Biofilm, and Water Quality',
            'icon': 'fa fa-bank fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_radiography',
            'name': 'Dental Radiography',
            'icon': 'fa fa-check-square-o fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        },
        {
            'url': '/ic_digital_radiography',
            'name': 'Digital Radiography',
            'icon': 'fa fa-star fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'right'
        }      
    ],
    'HIPAA':[
        // Top
        {
            'url': '/dashboard_type',
            'name': 'OPEN CHANGE REQUESTS',
            'icon': 'icon-user-follow',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6  col-md-15',
            'bg_color': 'bg-warning',
            'url_type': 'change_request__c',
            'url_filter': 'open_change_request',
        },
        {
            'url': '/media_sanitization',
            'name': 'PENDING SANITIZATION REQUESTS',
            'icon': 'icon-basket-loaded',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6  col-md-15',
            'bg_color': 'bg-success',
        },
        {
            'url': '/media_sanitization',
            'name': 'SUBMITTED SANITIZATION',
            'icon': 'icon-pie-chart',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6  col-md-15',
            'bg_color': 'bg-info'
        },
        {
            'url': '/dashboard_type',
            'name': 'OPEN BREACH INCIDENTS',
            'icon': 'icon-speedometer',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6  col-md-15',
            'bg_color': 'bg-danger',
            'url_type': 'security_incident__c',
            'url_filter': 'open_breach_incident',
        },
        {
            'url': '/dashboard_type',
            'name': 'FAILED BAA REVIEWS',
            'icon': 'icon-speech',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'top',
            'width': 'col-xs-12 col-sm-6  col-md-15',
            'bg_color': 'bg-primary',
            'url_type': 'vendor_review__c',
            'url_filter': 'review_failed',
        },
        // Left
        {
            'url': '/ic_engineering_controls',
            'name': 'Last Date of Yearly Risk Analysis',
            'icon': 'fa fa-fire fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'date',
            'pos': 'left'
        },
        {
            'url': '/security_incident',
            'name': 'Under 500 Breaches this year',
            'icon': 'fa fa-code-fork fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/security_incident',
            'name': '500 or Over Breaches this year',
            'icon': 'fa fa-code-fork fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/ic_engineering_controls',
            'name': '# of HIPAA Training past due',
            'icon': 'fa fa-users fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/security_incident',
            'name': 'Open Security Incidents',
            'icon': 'fa fa-lock fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/security_incident',
            'name': 'Open Breach Incidents',
            'icon': 'fa fa-circle fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/change_request',
            'name': 'Open Change Requests',
            'icon': 'fa fa-code-fork fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
        {
            'url': '/security_incident',
            'name': 'Reportable Breaches this year',
            'icon': 'fa fa-users fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'left'
        },
         // Right
         {
            'url': '/vendors',
            'name': 'Active Business Associates (BAs)',
            'icon': 'fa fa-bank fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'right'
        },
        {
            'url': '/baa',
            'name': 'BAs with unsigned BAA',
            'icon': 'fa fa-sign-in fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'right'
        },
        {
            'url': '/vendor_review',
            'name': 'BA reviews sent out',
            'icon': 'fa fa-check-square-o fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'right'
        },
        {
            'url': '/vendor_review',
            'name': 'BA reviews completed',
            'icon': 'fa fa-star fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'right'
        },
        {
            'url': '/vendor_review',
            'name': 'BAs failed review',
            'icon': 'fa fa-star-o fa-fw dashboard-fa-size',
            'isloading': false,
            'data': -1,
            'type': 'integer',
            'pos': 'right'
        },
    ],
}