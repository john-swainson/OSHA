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
export const navItems: NavData[] = [
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
];

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
