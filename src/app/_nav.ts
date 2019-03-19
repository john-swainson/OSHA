export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: any;
  title?: boolean;
  children?: any;
  variant?: string;
  attributes?: object;
  divider?: boolean;
  class?: string;
  label?: any;
  wrapper?: any;
}
export const navItems: any = {
  'OSHA':[
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Your Organization'
    },
    {
      name: 'Post Exposure Management',
      url: '/ic_post_exposure_management',
      icon: 'icon-drop'
    },
    {
      name: 'HBV-Preventing Transmission',
      url: '/ic_preventing_transmission',
      icon: 'icon-bulb'
    },
    {
      name: 'Perform Engineering Controls',
      url: '/ic_engineering_controls',
      icon: 'icon-microphone'
    },
    {
      name: 'Contact and Latex Allergy',
      url: '/ic_contact_dermatitis',
      icon: 'icon-graph'
    },
    {
      name: 'Records Maintenance',
      url: '/ic_records_maintenance',
      icon: 'icon-calculator'
    },
    {
      name: 'Facilites',
      url: '/facility',
      icon: 'icon-feed'
    },
    {
      name: 'Employees',
      url: '/hipaa_contact',
      icon: 'icon-people'
    },
    {
      name: 'Safety Data Sheet',
      url: '/safety_data_sheet',
      icon: 'icon-badge'
    },
    //=========================================
    {
      title: true,
      name: 'Process Review Dates'
    },
    {
      name: 'Instrument Processing',
      url: '/ic_instrument_processing',
      icon: 'icon-compass'
    },
    {
      name: 'Work Practice Controls',
      url: '/ic_work_practice',
      icon: 'icon-options'
    },
    {
      name: 'Prep and Packaging',
      url: '/ic_prep_packaging',
      icon: 'icon-disc'
    },
    {
      name: 'Unwrapped Instruments',
      url: '/ic_unwrapped_instruments',
      icon: 'icon-bell'
    },
    {
      name: 'Implantable Devices',
      url: '/ic_implantable_devices',
      icon: 'icon-globe'
    },
    {
      name: 'Sterilization Monitoring',
      url: '/ic_sterilization_monitoring',
      icon: 'icon-drawer'
    },
    {
      name: 'Sterilization Disinfection Patient Items',
      url: '/ic_sterilization_disinfection',
      icon: 'icon-frame'
    },
    {
      name: 'Managing Environmental Surfaces',
      url: '/ic_managing_surfaces',
      icon: 'icon-note'
    },
    {
      name: 'Regulated Medical Waste',
      url: '/ic_regulated_waste',
      icon: 'icon-ban'
    },
    {
      name: 'Extracted Teeth',
      url: '/ic_extracted_teeth',
      icon: 'icon-magnifier'
    },
    {
      name: 'Dental Unit Waterlines, Water Quality',
      url: '/ic_dental_quality',
      icon: 'icon-refresh'
    },
    {
      name: 'Devices Attached to Airline, Waterline',
      url: '/ic_dental_airwaterlines',
      icon: 'icon-plane'
    },
    {
      name: 'Dental Radiography',
      url: '/ic_radiography',
      icon: 'icon-lock'
    },
    {
      name: 'Digital radiography',
      url: '/ic_digital_radiography',
      icon: 'icon-envelope'
    },
  ],
  'HIPAA':[
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Training',
      url: '/ic_post_exposure_management',
      icon: 'icon-drop'
    },
    {
      name: 'Manage Organization',
      url: '/ic_preventing_transmission',
      icon: 'icon-bulb',
      children: [
        {
          name: 'Organization',
          url: '/organization_info',
        },
        {
          name: 'Security Reminders',
          url: '/ic_preventing_transmission',
        },
        {
          name: 'Media Sanitization Authority',
          url: '/media_sanitization_authority',
        },
        {
          name: 'Security Devices',
          url: '/device_registry',
        },
      ]
    },
    {
      name: 'Customer Management',
      url: '/ic_engineering_controls',
      icon: 'icon-microphone',
      children: [
        {
          name: 'Leads',
          url: '/lead',
        },
        {
          name: 'Customer Organizations',
          url: '/ic_preventing_transmission',
        },
        {
          name: 'Market Offerings',
          url: '/market_offering',
        }
      ]
    },
    {
      name: 'HIPAA Contacts',
      url: '/ic_contact_dermatitis',
      icon: 'icon-graph',
      children: [
        {
          name: 'Contacts',
          url: '/hipaa_contact',
        },
        {
          name: 'HIPAA Sanctions',
          url: '/hipaa_warning',
        },
        {
          name: 'System Access',
          url: '/system_access',
        },
        {
          name: 'Groups',
          url: '/group',
        },
        {
          name: 'Group Contacts',
          url: '/group_contact',
        }
      ]
    },
    {
      name: 'Policies and Procedures',
      url: '/policy_and_procedure',
      icon: 'icon-calculator'
    },
    {
      name: 'Change Request',
      url: '/change_request',
      icon: 'icon-feed'
    },
    {
      name: 'Security Incident',
      url: '/security_incident',
      icon: 'icon-people'
    },
    {
      name: 'Hardware Management',
      url: '/safety_data_sheet',
      icon: 'icon-badge',
      children: [
        {
          name: 'Hardware Inventory',
          url: '/hardware_inventory',
        },
        {
          name: 'Security Test Results',
          url: '/security_test',
        },
        {
          name: 'Media Sanitization Requests',
          url: '/media_sanitization_request',
        },
      ]
    },
    {
      name: 'Software Inventory',
      url: '/software_inventory',
      icon: 'icon-compass'
    },
    {
      name: 'Website Management',
      url: '/ic_work_practice',
      icon: 'icon-options',
      children: [
        {
          name: 'Websites',
          url: '/website',
        },
        {
          name: 'Websites Software Inventory',
          url: '/website_software_inventory',
        },
        {
          name: 'Websites Review',
          url: '/website_review',
        },
      ]
    },
    {
      name: 'Facility',
      url: '/',
      icon: 'icon-disc',
      children: [
        {
          name: 'Manage Facilities',
          url: '/facility',
        },
        {
          name: 'Team Members',
          url: '/team_members',
        },
        {
          name: 'Risk Assignment Vulnerability',
          url: '/risk_assessment_review',
        },
        {
          name: 'Manage Rooms',
          url: '/rooms',
        },
        {
          name: 'Backup Procedures',
          url: '/backup_procedure',
        },
        {
          name: 'NPP Extra',
          url: '/npp_extra',
        },
        {
          name: 'Risk Matrix',
          url: '/risk_matrix',
        },
        {
          name: 'Security Tool Setting',
          url: '/security_tool_setting',
        },
      ]
    },
    {
      name: 'Internet Service Provider',
      url: '/ic_unwrapped_instruments',
      icon: 'icon-bell',
      children: [
        {
          name: 'Manage ISP',
          url: '/isp_communication',
        },
        {
          name: 'Manage ISP Circuit IDs',
          url: '/isp_circuit_id',
        },
      ]
    },
    {
      name: 'Vendors',
      url: '/ic_implantable_devices',
      icon: 'icon-globe',
      children: [
        {
          name: 'Manage Vendors',
          url: '/vendors',
        },
        {
          name: 'Manage Vendor Breaches',
          url: '/vendor_breaches',
        },
        {
          name: 'Manage Vendor Reviews',
          url: '/vendor_review',
        } 
      ]
    },
    {
      name: 'Threat Source',
      url: '/threat_sources',
      icon: 'icon-drawer'
    },
    {
      name: 'Custom Software',
      url: '/ic_sterilization_disinfection',
      icon: 'icon-frame',
      children: [
        {
          name: 'Custom Inventory',
          url: '/custom_software',
        },
        {
          name: 'Software Audit',
          url: '/custom_software_audit',
        },
      ]
    },
  ]
};

// export const navItems: NavData[] = [
//   {
//     name: 'Dashboard',
//     url: '/dashboard',
//     icon: 'icon-speedometer',
//     badge: {
//       variant: 'info',
//       text: 'NEW'
//     }
//   },
//   {
//     title: true,
//     name: 'Theme'
//   },
//   {
//     name: 'Colors',
//     url: '/theme/colors',
//     icon: 'icon-drop'
//   },
//   {
//     name: 'Typography',
//     url: '/theme/typography',
//     icon: 'icon-pencil'
//   },
//   {
//     title: true,
//     name: 'Components'
//   },
//   {
//     name: 'Base',
//     url: '/base',
//     icon: 'icon-puzzle',
//     children: [
//       {
//         name: 'Cards',
//         url: '/base/cards',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Carousels',
//         url: '/base/carousels',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Collapses',
//         url: '/base/collapses',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Forms',
//         url: '/base/forms',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Pagination',
//         url: '/base/paginations',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Popovers',
//         url: '/base/popovers',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Progress',
//         url: '/base/progress',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Switches',
//         url: '/base/switches',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Tables',
//         url: '/base/tables',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Tabs',
//         url: '/base/tabs',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Tooltips',
//         url: '/base/tooltips',
//         icon: 'icon-puzzle'
//       }
//     ]
//   },
//   {
//     name: 'Buttons',
//     url: '/buttons',
//     icon: 'icon-cursor',
//     children: [
//       {
//         name: 'Buttons',
//         url: '/buttons/buttons',
//         icon: 'icon-cursor'
//       },
//       {
//         name: 'Dropdowns',
//         url: '/buttons/dropdowns',
//         icon: 'icon-cursor'
//       },
//       {
//         name: 'Brand Buttons',
//         url: '/buttons/brand-buttons',
//         icon: 'icon-cursor'
//       }
//     ]
//   },
//   {
//     name: 'Charts',
//     url: '/charts',
//     icon: 'icon-pie-chart'
//   },
//   {
//     name: 'Icons',
//     url: '/icons',
//     icon: 'icon-star',
//     children: [
//       {
//         name: 'CoreUI Icons',
//         url: '/icons/coreui-icons',
//         icon: 'icon-star',
//         badge: {
//           variant: 'success',
//           text: 'NEW'
//         }
//       },
//       {
//         name: 'Flags',
//         url: '/icons/flags',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Font Awesome',
//         url: '/icons/font-awesome',
//         icon: 'icon-star',
//         badge: {
//           variant: 'secondary',
//           text: '4.7'
//         }
//       },
//       {
//         name: 'Simple Line Icons',
//         url: '/icons/simple-line-icons',
//         icon: 'icon-star'
//       }
//     ]
//   },
//   {
//     name: 'Notifications',
//     url: '/notifications',
//     icon: 'icon-bell',
//     children: [
//       {
//         name: 'Alerts',
//         url: '/notifications/alerts',
//         icon: 'icon-bell'
//       },
//       {
//         name: 'Badges',
//         url: '/notifications/badges',
//         icon: 'icon-bell'
//       },
//       {
//         name: 'Modals',
//         url: '/notifications/modals',
//         icon: 'icon-bell'
//       }
//     ]
//   },
//   {
//     name: 'Widgets',
//     url: '/widgets',
//     icon: 'icon-calculator',
//     badge: {
//       variant: 'info',
//       text: 'NEW'
//     }
//   },
//   {
//     divider: true
//   },
//   {
//     title: true,
//     name: 'Extras',
//   },
//   {
//     name: 'Pages',
//     url: '/pages',
//     icon: 'icon-star',
//     children: [
//       {
//         name: 'Login',
//         url: '/login',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Register',
//         url: '/register',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Error 404',
//         url: '/404',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Error 500',
//         url: '/500',
//         icon: 'icon-star'
//       }
//     ]
//   },

// ];
