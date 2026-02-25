/**
 * Navigation type definitions
 * Used by Navbar and navigation data files
 */

export interface NavItem {
  name: string
  path: string
  external?: boolean
}

export interface NavDropdownItem extends NavItem {
  children?: NavItem[]
}
