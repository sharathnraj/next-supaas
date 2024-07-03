import Calculator from '@/public/icons/calculator.svg';
import Call from '@/public/icons/call.svg';
import CapturePhotos from '@/public/icons/capturePhotos.svg';
import Diagrams from '@/public/icons/diagrams.svg';
import Download from '@/public/icons/download.svg';
import ErrorCode from '@/public/icons/errorCode.svg';
import Info from '@/public/icons/info.svg';
import Install from '@/public/icons/install.svg';
import Lights from '@/public/icons/lights.svg';
import LocationOn from '@/public/icons/locationOn.svg';
import NewClaim from '@/public/icons/newClaim.svg';
import Operational from '@/public/icons/operational.svg';
import Rebate from '@/public/icons/rebate.svg';
import Register from '@/public/icons/register.svg';
import Specifications from '@/public/icons/specifications.svg';
import Support from '@/public/icons/support.svg';
import Symbols from '@/public/icons/symbols.svg';
import Troubleshooting from '@/public/icons/troubleshooting.svg';

export default function getIcon(name: string) {
  switch (name) {
    case 'calculator':
      return Calculator;
    case 'call':
      return Call;
    case 'capturePhotos':
      return CapturePhotos;
    case 'diagrams':
      return Diagrams;
    case 'download':
      return Download;
    case 'errorCode':
      return ErrorCode;
    case 'info':
      return Info;
    case 'install':
      return Install;
    case 'lights':
      return Lights;
    case 'locationOn':
      return LocationOn;
    case 'newClaim':
      return NewClaim;
    case 'operational':
      return Operational;
    case 'rebate':
      return Rebate;
    case 'register':
      return Register;
    case 'specifications':
      return Specifications;
    case 'support':
      return Support;
    case 'symbols':
      return Symbols;
    case 'troubleshooting':
      return Troubleshooting;
    default:
      return null;
  }
}
