import { useState } from 'react';
import './DarkBlueScreen.css';

import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MapIcon from '@mui/icons-material/Map';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ErrorIcon from '@mui/icons-material/Error';
import PersonIcon from '@mui/icons-material/Person';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NearMeIcon from '@mui/icons-material/NearMe';
import GridViewIcon from '@mui/icons-material/GridView';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

// ── Design tokens ─────────────────────────────────────────────────────────────

const C = {
  bg01: '#e8f0f8',
  bg02: '#f5f8fc',
  bg03: '#dde8f2',
  bgSecondary: '#1d4ed8',
  bgPrimary: '#2563eb',
  bgPrimary02: '#1d4ed8',
  fg01: '#0d1f2d',
  fg03: '#4a6580',
  border: '#b8cedd',
  shadow: 'rgba(0,0,0,0.15)',
} as const;

// Figma asset URLs — valid ~7 days from generation
const MAP_IMAGE =
  'https://www.figma.com/api/mcp/asset/4d56a0d2-bff0-4d96-8d79-82722f5beeb5';
const LOGO_IMAGE =
  'https://www.figma.com/api/mcp/asset/b177a241-2114-47e3-918f-dc52355befc3';

// ── TopBar ────────────────────────────────────────────────────────────────────

function IconBtn({
  children,
  onClick,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="dbs-icon-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        padding: 0,
        border: 'none',
        background: 'transparent',
        borderRadius: 4,
        cursor: 'pointer',
        color: C.fg01,
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

function TopBar() {
  const [search, setSearch] = useState('');

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 64,
        flexShrink: 0,
        background: C.bg02,
        padding: '0 24px',
        gap: 24,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Left: time + icon buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
        <span
          style={{
            color: C.fg01,
            fontSize: 18,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          18:06:15
        </span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconBtn aria-label="Tags"><LocalOfferIcon sx={{ fontSize: 24 }} /></IconBtn>
          <IconBtn aria-label="Bookmarks"><BookmarkIcon sx={{ fontSize: 20 }} /></IconBtn>
          <IconBtn aria-label="Navigate"><NearMeIcon sx={{ fontSize: 24 }} /></IconBtn>
          <IconBtn aria-label="Apps"><GridViewIcon sx={{ fontSize: 24 }} /></IconBtn>
          <IconBtn aria-label="Chat"><ChatIcon sx={{ fontSize: 20 }} /></IconBtn>
        </div>
      </div>

      {/* Center: search input (absolute so it stays centered) */}
      <div
        className="dbs-search-wrap"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 40,
          width: 280,
          padding: '0 12px',
          borderRadius: 1000,
          background: 'rgba(0,0,0,0.04)',
          border: `1px solid ${C.border}`,
          boxSizing: 'border-box',
        }}
      >
        <input
          className="dbs-search-input"
          type="text"
          placeholder="חיפוש"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
        />
        <SearchIcon sx={{ fontSize: 16, color: C.fg03, flexShrink: 0 }} />
      </div>

      {/* Right: hamburger + logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexShrink: 0,
        }}
      >
        <IconBtn aria-label="Menu"><MenuIcon sx={{ fontSize: 24 }} /></IconBtn>
        <div style={{ width: 100, height: 40, display: 'flex', alignItems: 'center' }}>
          <img
            src={LOGO_IMAGE}
            alt="Logo"
            style={{ height: '100%', width: 'auto', maxWidth: '100%', display: 'block' }}
          />
        </div>
      </div>
    </header>
  );
}

// ── HorizontalSidePanel ───────────────────────────────────────────────────────

type TreeNode = {
  id: number;
  label: string;
  depth: 0 | 1 | 2;
  parentId: number | null;
  expandable: boolean;
  defaultBg: string;
  hasSettings?: boolean;
};

const TREE_NODES: TreeNode[] = [
  { id: 0,  label: 'הורה פתוח', depth: 0, parentId: null, expandable: true,  defaultBg: C.bg03, hasSettings: true },
  { id: 1,  label: 'ילד פתוח',  depth: 1, parentId: 0,    expandable: true,  defaultBg: C.bg02 },
  { id: 2,  label: 'ילד 2',     depth: 2, parentId: 1,    expandable: false, defaultBg: C.bg01 },
  { id: 3,  label: 'ילד 2',     depth: 2, parentId: 1,    expandable: false, defaultBg: C.bg01 },
  { id: 4,  label: 'ילד',       depth: 1, parentId: 0,    expandable: false, defaultBg: C.bg02 },
  { id: 5,  label: 'ילד',       depth: 0, parentId: null, expandable: false, defaultBg: C.bg03 },
  { id: 6,  label: 'ילד',       depth: 0, parentId: null, expandable: false, defaultBg: C.bg03 },
  { id: 7,  label: 'ילד',       depth: 0, parentId: null, expandable: false, defaultBg: C.bg03 },
  { id: 8,  label: 'ילד',       depth: 0, parentId: null, expandable: false, defaultBg: C.bg03 },
  { id: 9,  label: 'כותרת',     depth: 0, parentId: null, expandable: true,  defaultBg: C.bg03 },
  { id: 10, label: 'כותרת',     depth: 0, parentId: null, expandable: true,  defaultBg: C.bg03 },
];

const INDENT_PR: Record<0 | 1 | 2, number> = { 0: 32, 1: 60, 2: 88 };

function isNodeVisible(node: TreeNode, expanded: Set<number>): boolean {
  if (node.parentId === null) return true;
  if (!expanded.has(node.parentId)) return false;
  const parent = TREE_NODES.find((n) => n.id === node.parentId)!;
  return isNodeVisible(parent, expanded);
}

function HorizontalSidePanel({
  selectedId,
  onSelect,
  expanded,
  onToggle,
}: {
  selectedId: number;
  onSelect: (id: number) => void;
  expanded: Set<number>;
  onToggle: (id: number) => void;
}) {
  const visible = TREE_NODES.filter((n) => isNodeVisible(n, expanded));

  return (
    <div
      style={{
        width: 360,
        flexShrink: 0,
        height: '100%',
        background: C.bg02,
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `-4px 0px 16px 0px ${C.shadow}`,
        position: 'relative',
        zIndex: 2,
      }}
    >
      {visible.map((node) => {
        const pr = INDENT_PR[node.depth];
        const expandRight = pr - 24;
        const isSelected = node.id === selectedId;
        const bg = isSelected ? C.bgSecondary : node.defaultBg;
        const fg = C.fg01;
        const isExpanded = expanded.has(node.id);

        return (
          <div
            key={node.id}
            role="row"
            aria-selected={isSelected}
            className="dbs-tree-row"
            onClick={() => onSelect(node.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              minHeight: 50,
              background: bg,
              paddingLeft: 16,
              paddingRight: pr,
              paddingTop: 8,
              paddingBottom: 8,
              borderBottom: `1px solid ${C.border}`,
              position: 'relative',
              flexShrink: 0,
              gap: 8,
              cursor: 'pointer',
            }}
          >
            {/* Expand/collapse indicator – stopPropagation so it doesn't also select the row */}
            {node.expandable && (
              <div
                role="button"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                className="dbs-expand-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(node.id);
                }}
                style={{
                  position: 'absolute',
                  right: expandRight,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                {isExpanded ? (
                  <ExpandMoreIcon sx={{ fontSize: 24, color: fg }} />
                ) : (
                  <ChevronLeftIcon sx={{ fontSize: 24, color: fg }} />
                )}
              </div>
            )}

            {/* end-content: layers icon (visual left) */}
            <LayersIcon sx={{ fontSize: 24, color: fg, flexShrink: 0 }} />

            {/* start-content: label + right-side icon */}
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 12, minWidth: 0 }}>
              <p
                style={{
                  flex: 1,
                  color: fg,
                  fontSize: 20,
                  margin: 0,
                  textAlign: 'right',
                  direction: 'ltr',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {node.label}
              </p>
              {node.hasSettings ? (
                <SettingsIcon sx={{ fontSize: 24, color: fg, flexShrink: 0 }} />
              ) : (
                <FolderOpenIcon sx={{ fontSize: 24, color: fg, flexShrink: 0 }} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── VerticalSidePanel ─────────────────────────────────────────────────────────

type VertTab = {
  label: string;
  icon: React.ReactNode;
  defaultBg: string;
  gradient?: boolean;
};

const VERT_TABS: VertTab[] = [
  { label: 'טקסט', icon: <MapIcon sx={{ fontSize: 32 }} />, defaultBg: C.bg03 },
  {
    label: 'פתוח',
    icon: <AcUnitIcon sx={{ fontSize: 32 }} />,
    defaultBg: C.bgSecondary,
    gradient: true,
  },
  { label: 'בחור', icon: <DateRangeIcon sx={{ fontSize: 32 }} />, defaultBg: C.bg02 },
  { label: 'ילד',  icon: <NotificationsIcon sx={{ fontSize: 32 }} />, defaultBg: C.bg02 },
  { label: 'ילד',  icon: <ErrorIcon sx={{ fontSize: 32 }} />, defaultBg: C.bg02 },
  { label: 'טקסט', icon: <PersonIcon sx={{ fontSize: 32 }} />, defaultBg: C.bg03 },
];

function VerticalSidePanel({
  selectedIdx,
  onSelect,
}: {
  selectedIdx: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      style={{
        width: 110,
        flexShrink: 0,
        height: '100%',
        background: C.bg02,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `-4px 0px 16px 0px ${C.shadow}`,
        position: 'relative',
        zIndex: 3,
      }}
    >
      {VERT_TABS.map((tab, i) => {
        const isSelected = i === selectedIdx;

        let bgStyle: React.CSSProperties;
        if (isSelected) {
          bgStyle = { background: C.bgSecondary };
        } else if (tab.gradient) {
          bgStyle = {
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.38) 100%), linear-gradient(90deg, ${C.bgSecondary} 0%, ${C.bgSecondary} 100%)`,
          };
        } else {
          bgStyle = { background: tab.defaultBg };
        }

        return (
          <button
            key={i}
            aria-label={tab.label}
            aria-pressed={isSelected}
            onClick={() => onSelect(i)}
            className="dbs-vert-tab"
            style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '24px 8px',
              border: 'none',
              borderBottom: `2px solid ${C.bg01}`,
              cursor: 'pointer',
              color: C.fg01,
              ...bgStyle,
            }}
          >
            <div style={{ display: 'flex', flexShrink: 0 }}>{tab.icon}</div>
            <span
              style={{
                color: C.fg01,
                fontSize: 20,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                width: '100%',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── BottomActionBar ───────────────────────────────────────────────────────────

function ActionItem({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className="dbs-action-item"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        height: '100%',
        minWidth: 74,
        width: 74,
        padding: '16px 8px',
        background: selected ? C.bgPrimary02 : 'transparent',
        border: 'none',
        flexShrink: 0,
        boxSizing: 'border-box',
        color: C.fg01,
      }}
    >
      <CreateNewFolderOutlinedIcon sx={{ fontSize: 24, color: C.fg01 }} />
      <span
        style={{
          color: C.fg01,
          fontSize: selected ? 16 : 18,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          width: '100%',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {label}
      </span>
    </button>
  );
}

const BOTTOM_LEFT_ACTIONS = ['טקסט', 'בחור 1', 'טקסט', 'טקסט'];
const BOTTOM_RIGHT_ACTIONS = ['טקסט', 'טקסט', 'טקסט', 'טקסט'];

function BottomActionBar({
  selectedIdx,
  onSelect,
}: {
  selectedIdx: number;
  onSelect: (i: number) => void;
}) {
  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 84,
        flexShrink: 0,
        background: C.bg01,
        overflow: 'hidden',
        boxShadow: `0px -2px 8px 0px ${C.shadow}`,
        position: 'relative',
        zIndex: 4,
      }}
    >
      {/* Left group */}
      <div style={{ display: 'flex', alignItems: 'center', height: 80, flex: 1 }}>
        {BOTTOM_LEFT_ACTIONS.map((label, i) => (
          <ActionItem
            key={i}
            label={label}
            selected={selectedIdx === i}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      {/* Center slot (FAB placeholder) */}
      <div style={{ width: 100, flexShrink: 0 }} />

      {/* Right group — offset index to avoid collision with left group */}
      <div style={{ display: 'flex', alignItems: 'center', height: 80, flex: 1, justifyContent: 'flex-end' }}>
        {BOTTOM_RIGHT_ACTIONS.map((label, i) => (
          <ActionItem
            key={i + 10}
            label={label}
            selected={selectedIdx === i + 10}
            onClick={() => onSelect(i + 10)}
          />
        ))}
      </div>
    </footer>
  );
}

// ── Snackbar ──────────────────────────────────────────────────────────────────

function CreatePointSnackbar({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'absolute',
        left: 24,
        bottom: 24,
        width: 400,
        background: C.bg03,
        borderRadius: 4,
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: `0 8px 32px 0 ${C.shadow}`,
        zIndex: 20,
      }}
    >
      {/* Close button + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <IconBtn aria-label="Dismiss" onClick={onClose}>
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconBtn>
        <span
          style={{
            color: C.fg01,
            fontSize: 16,
            whiteSpace: 'nowrap',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Create Point
        </span>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          className="dbs-snackbar-outline"
          onClick={onClose}
          style={{
            height: 32,
            minWidth: 80,
            padding: '4px 12px',
            border: `1px solid ${C.border}`,
            borderRadius: 4,
            background: 'transparent',
            color: C.fg01,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Action
        </button>
        <button
          className="dbs-snackbar-primary"
          onClick={() => alert('Primary action')}
          style={{
            height: 32,
            minWidth: 80,
            padding: '4px 12px',
            border: 'none',
            borderRadius: 4,
            background: C.bgPrimary,
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Action
        </button>
      </div>
    </div>
  );
}

// ── DarkBlueScreen ────────────────────────────────────────────────────────────

export default function DarkBlueScreen() {
  const [selectedTreeItem, setSelectedTreeItem] = useState(3);
  // Initially: items 0 and 1 are expanded; 9 and 10 are collapsible (not in set)
  const [expandedNodes, setExpandedNodes] = useState(new Set([0, 1]));
  const [selectedVertTab, setSelectedVertTab] = useState(2);
  const [selectedBottomAction, setSelectedBottomAction] = useState(1);
  const [snackbarVisible, setSnackbarVisible] = useState(true);

  function handleToggleNode(id: number) {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: C.bg02,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <TopBar />

      {/* Content row */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Map area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <img
            src={MAP_IMAGE}
            alt="Map"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {snackbarVisible && (
            <CreatePointSnackbar onClose={() => setSnackbarVisible(false)} />
          )}
        </div>

        <HorizontalSidePanel
          selectedId={selectedTreeItem}
          onSelect={setSelectedTreeItem}
          expanded={expandedNodes}
          onToggle={handleToggleNode}
        />
        <VerticalSidePanel
          selectedIdx={selectedVertTab}
          onSelect={setSelectedVertTab}
        />
      </div>

      <BottomActionBar
        selectedIdx={selectedBottomAction}
        onSelect={setSelectedBottomAction}
      />
    </div>
  );
}
