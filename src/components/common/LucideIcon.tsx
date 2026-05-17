import React from 'react';
import { 
  HelpCircle, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Mail, 
  Bell, 
  Calendar,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Globe,
  Info,
  AlertTriangle,
  CheckCircle2,
  Phone,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Building2,
  MapPin,
  Clock,
  RefreshCcw,
  ShieldCheck,
  Zap,
  Sparkles,
  Trophy,
  BookOpen,
  Euro
} from 'lucide-react';
import { LucideProps } from 'lucide-react';

// Explicit map to avoid wildcard namespace import issues in production
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  'HelpCircle': HelpCircle,
  'Search': Search,
  'User': User,
  'Settings': Settings,
  'LogOut': LogOut,
  'LayoutDashboard': LayoutDashboard,
  'Mail': Mail,
  'Bell': Bell,
  'Calendar': Calendar,
  'ChevronRight': ChevronRight,
  'ChevronLeft': ChevronLeft,
  'ChevronDown': ChevronDown,
  'Globe': Globe,
  'Info': Info,
  'AlertTriangle': AlertTriangle,
  'CheckCircle2': CheckCircle2,
  'Phone': Phone,
  'ArrowRight': ArrowRight,
  'ArrowLeft': ArrowLeft,
  'MessageSquare': MessageSquare,
  'Briefcase': Briefcase,
  'GraduationCap': GraduationCap,
  'Building2': Building2,
  'MapPin': MapPin,
  'Clock': Clock,
  'RefreshCcw': RefreshCcw,
  'ShieldCheck': ShieldCheck,
  'Zap': Zap,
  'Sparkles': Sparkles,
  'Trophy': Trophy,
  'BookOpen': BookOpen,
  'Euro': Euro
};

interface LucideIconProps extends LucideProps {
  name: string;
}

const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  // Use the map if available, otherwise fall back to a safe default
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    // Ultimate safe fallback to prevent crashes if an icon is missing from our map
    return <HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};

export default LucideIcon;


