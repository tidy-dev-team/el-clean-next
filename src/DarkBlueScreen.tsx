import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Layers,
  Settings,
  ExpandMore,
  ChevronLeft,
  Map,
  AcUnit,
  DateRange,
  Notifications,
  Error as ErrorIcon,
  Person,
  DriveFileMove,
  Bookmark,
  NearMe,
  MoreHoriz,
  Chat,
  Menu as MenuIcon,
  Search,
  Close,
} from '@mui/icons-material';
import type { SxProps } from '@mui/material';

const C = {
  bg01: '#000',
  bg02: '#122438',
  bg03: '#20364d',
  bgSec: '#4272b8',
  bgPrim: '#5ea0ff',
  border: '#869fb8',
  fg: '#fff',
  fgMuted: '#869fb8',
  btnBorder: '#54779a',
} as const;

const MAP_IMG = 'https://www.figma.com/api/mcp/asset/a0557604-5edf-4201-9065-436e86328781';
const LOGO_IMG = 'https://www.figma.com/api/mcp/asset/98808a1e-744e-4d7b-a7cf-7b5b3268be35';

// padding-right per depth level (creates RTL indentation)
const DEPTH_PR = [32, 60, 88] as const;

// --- Top Bar ---

function TopBar() {
  const iconBtn: SxProps = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 40, height: 40, borderRadius: '4px', cursor: 'pointer', flexShrink: 0,
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
  };

  return (
    <Box sx={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 64, zIndex: 20,
      backgroundColor: C.bg02,
      display: 'flex', alignItems: 'center',
      px: '24px', gap: '24px',
    }}>
      {/* Left: time + icon buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Typography sx={{ color: C.fg, fontSize: 18, fontWeight: 500, whiteSpace: 'nowrap', fontFamily: 'Arial, sans-serif' }}>
          18:06:15
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={iconBtn}><Bookmark sx={{ color: C.fg, fontSize: 20 }} /></Box>
          <Box sx={iconBtn}><NearMe sx={{ color: C.fg, fontSize: 24 }} /></Box>
          <Box sx={iconBtn}><MoreHoriz sx={{ color: C.fg, fontSize: 24 }} /></Box>
          <Box sx={iconBtn}><Chat sx={{ color: C.fg, fontSize: 20 }} /></Box>
        </Box>
      </Box>

      {/* Center: search bar */}
      <Box sx={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: '8px',
          height: 40, minWidth: 280, px: '12px',
          backgroundColor: 'rgba(0,0,0,0.38)',
          border: `1px solid ${C.border}`,
          borderRadius: '1000px',
        }}>
          <Typography sx={{ flex: 1, color: C.fgMuted, fontSize: 14, textAlign: 'right', fontFamily: 'Arial, sans-serif' }}>
            חיפוש
          </Typography>
          <Search sx={{ color: C.fgMuted, fontSize: 16 }} />
        </Box>
      </Box>

      {/* Right: hamburger + logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        <Box sx={iconBtn}><MenuIcon sx={{ color: C.fg, fontSize: 24 }} /></Box>
        <Box sx={{ width: 100, height: 40, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <img src={LOGO_IMG} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Box>
      </Box>
    </Box>
  );
}

// --- Horizontal Side Panel (tree list) ---

type TreeItem = {
  label: string;
  depth: 0 | 1 | 2;
  bg: string;
  expanded?: boolean;
  collapsed?: boolean;
  hasSettings?: boolean;
};

const TREE_ITEMS: TreeItem[] = [
  { label: 'הורה פתוח', depth: 0, bg: C.bg03, expanded: true, hasSettings: true },
  { label: 'ילד פתוח',  depth: 1, bg: C.bg02, expanded: true },
  { label: 'ילד 2',     depth: 2, bg: C.bg01 },
  { label: 'ילד 2',     depth: 2, bg: C.bgSec },
  { label: 'ילד',       depth: 1, bg: C.bg02 },
  { label: 'ילד',       depth: 0, bg: C.bg03 },
  { label: 'ילד',       depth: 0, bg: C.bg03 },
  { label: 'ילד',       depth: 0, bg: C.bg03 },
  { label: 'כותרת',     depth: 0, bg: C.bg03, collapsed: true },
  { label: 'כותרת',     depth: 0, bg: C.bg03, collapsed: true },
];

function TreeRow({ label, depth, bg, expanded, collapsed, hasSettings }: TreeItem) {
  const pr = DEPTH_PR[depth];
  const showChevron = expanded || collapsed;
  const chevronRight = pr - 24;

  return (
    <Box sx={{
      position: 'relative',
      display: 'flex', alignItems: 'center',
      flexDirection: 'row-reverse', // RTL: items flow right→left
      minHeight: 40, width: '100%',
      pr: `${pr}px`, pl: '16px', py: '18px',
      borderBottom: `1px solid ${C.border}`,
      backgroundColor: bg,
      boxSizing: 'border-box',
      gap: '12px', flexShrink: 0,
    }}>
      {/* Expand / collapse chevron — lives in the right-padding zone */}
      {showChevron && (
        <Box sx={{
          position: 'absolute', right: `${chevronRight}px`,
          top: '50%', transform: 'translateY(-50%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 24, height: 24,
        }}>
          {expanded
            ? <ExpandMore sx={{ color: C.fg, fontSize: 24 }} />
            : <ChevronLeft sx={{ color: C.fg, fontSize: 24 }} />}
        </Box>
      )}

      {/* Layers icon (rightmost in content, after the chevron) */}
      <Layers sx={{ color: C.fg, fontSize: 24, flexShrink: 0 }} />

      {/* Label — fills remaining space */}
      <Typography sx={{
        flex: 1, color: C.fg, fontSize: 20,
        textAlign: 'right', fontFamily: 'Arial, sans-serif',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {label}
      </Typography>

      {/* Action icon (leftmost in content) */}
      {hasSettings
        ? <Settings sx={{ color: C.fg, fontSize: 24, flexShrink: 0 }} />
        : <MoreHoriz sx={{ color: C.fg, fontSize: 24, flexShrink: 0 }} />}
    </Box>
  );
}

function HorizontalPanel() {
  return (
    <Box sx={{
      position: 'absolute', top: 64, right: 110, width: 360, bottom: 84,
      backgroundColor: C.bg02, zIndex: 10,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: `-4px 0px 16px 0px #101111`,
    }}>
      {TREE_ITEMS.map((item, i) => <TreeRow key={i} {...item} />)}
    </Box>
  );
}

// --- Vertical Side Panel ---

type VertTab = {
  label: string;
  icon: React.ReactNode;
  bg: string;
  gradient?: boolean;
};

const VERT_TABS: VertTab[] = [
  { label: 'טקסט', icon: <Map sx={{ fontSize: 32, color: C.fg }} />,           bg: C.bg03 },
  { label: 'פתוח', icon: <AcUnit sx={{ fontSize: 32, color: C.fg }} />,        bg: C.bgSec, gradient: true },
  { label: 'בחור', icon: <DateRange sx={{ fontSize: 32, color: C.fg }} />,     bg: C.bgSec },
  { label: 'ילד',  icon: <Notifications sx={{ fontSize: 32, color: C.fg }} />, bg: C.bg02 },
  { label: 'ילד',  icon: <ErrorIcon sx={{ fontSize: 32, color: C.fg }} />,     bg: C.bg02 },
  { label: 'טקסט', icon: <Person sx={{ fontSize: 32, color: C.fg }} />,        bg: C.bg03 },
];

function VerticalPanel() {
  return (
    <Box sx={{
      position: 'absolute', top: 64, right: 0, width: 110, bottom: 84,
      backgroundColor: C.bg02, zIndex: 10,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: `-4px 0px 16px 0px #101111`,
    }}>
      {VERT_TABS.map(({ label, icon, bg, gradient }, i) => (
        <Box key={i} sx={{
          flex: '1 0 0', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '8px', px: '24px', py: '32px',
          borderBottom: '2px solid #000',
          background: gradient
            ? `linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 100%), linear-gradient(90deg, ${C.bgSec} 0%, ${C.bgSec} 100%)`
            : bg,
          cursor: 'pointer',
        }}>
          {icon}
          <Typography sx={{
            color: C.fg, fontSize: 20,
            fontFamily: 'Arial, sans-serif',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            textAlign: 'center', width: '100%',
          }}>
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

// --- Bottom Action Bar ---

type ActionItem = { label: string; selected?: boolean };

const LEFT_ACTIONS: ActionItem[] = [
  { label: 'טקסט' },
  { label: 'בחור 1', selected: true },
  { label: 'טקסט' },
  { label: 'טקסט' },
];

const RIGHT_ACTIONS: ActionItem[] = [
  { label: 'טקסט' },
  { label: 'טקסט' },
  { label: 'טקסט' },
  { label: 'טקסט' },
];

function ActionItemBox({ label, selected }: ActionItem) {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      width: 74, height: '100%', px: '8px', py: '16px', gap: '4px', flexShrink: 0,
      backgroundColor: selected ? C.bgSec : 'transparent',
      cursor: 'pointer',
      '&:hover': { backgroundColor: selected ? C.bgSec : 'rgba(255,255,255,0.06)' },
    }}>
      <DriveFileMove sx={{ color: C.fg, fontSize: 24 }} />
      <Typography sx={{
        color: C.fg, fontSize: selected ? 16 : 18,
        fontFamily: 'Arial, sans-serif', fontWeight: selected ? 500 : 400,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%',
        textAlign: 'center',
      }}>
        {label}
      </Typography>
    </Box>
  );
}

function BottomBar() {
  return (
    <Box sx={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 84,
      backgroundColor: C.bg01, zIndex: 20,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: `0px -2px 8px 0px #101111`,
      overflow: 'hidden',
    }}>
      {/* Left group */}
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, height: 80 }}>
        {LEFT_ACTIONS.map((item, i) => <ActionItemBox key={i} {...item} />)}
      </Box>

      {/* Right group */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1, height: 80 }}>
        {RIGHT_ACTIONS.map((item, i) => <ActionItemBox key={i} {...item} />)}
      </Box>
    </Box>
  );
}

// --- Snackbar ---

function SnackbarBar() {
  return (
    <Box sx={{
      position: 'absolute', left: 24, bottom: 84 + 12, width: 400,
      backgroundColor: C.bg03, zIndex: 30,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      p: '12px', borderRadius: '4px',
      boxShadow: `0px 8px 32px 0px #101111`,
    }}>
      {/* Left: close + label */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, borderRadius: '4px', cursor: 'pointer',
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
        }}>
          <Close sx={{ color: C.fg, fontSize: 16 }} />
        </Box>
        <Typography sx={{ color: C.fg, fontSize: 16, fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
          Create Point
        </Typography>
      </Box>

      {/* Right: action buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 32, minWidth: 80, px: '12px', py: '4px',
          border: `1px solid ${C.btnBorder}`, borderRadius: '4px',
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'rgba(84,119,154,0.15)' },
        }}>
          <Typography sx={{ color: C.fg, fontSize: 14, fontWeight: 500, fontFamily: 'Arial, sans-serif' }}>
            Action
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 32, minWidth: 80, px: '12px', py: '4px',
          backgroundColor: C.bgPrim, borderRadius: '4px',
          cursor: 'pointer', overflow: 'hidden',
          '&:hover': { backgroundColor: '#4d8fe0' },
        }}>
          <Typography sx={{ color: C.bg01, fontSize: 14, fontWeight: 500, fontFamily: 'Arial, sans-serif' }}>
            Action
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// --- Main Screen ---

export default function DarkBlueScreen() {
  return (
    <Box sx={{
      position: 'fixed', inset: 0,
      backgroundColor: C.bg02,
      overflow: 'hidden',
    }}>
      {/* Map — fills the area between top bar, side panels and bottom bar */}
      <Box sx={{
        position: 'absolute', top: 64, left: 0, right: 470, bottom: 84,
        overflow: 'hidden',
      }}>
        <img
          src={MAP_IMG}
          alt="map"
          style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      </Box>

      <TopBar />
      <HorizontalPanel />
      <VerticalPanel />
      <BottomBar />
      <SnackbarBar />
    </Box>
  );
}
