/**
 * Portal Drag & Drop Utilities
 * Shared types, MIME constant, prompt builder, and data parser
 * for dragging portal links to the AI chat assistant.
 */

export const DRAG_MIME = 'application/x-lurus-portal'

export interface PortalDragData {
  name: string
  url: string
  desc: string
  category: string
}

/**
 * Build an analysis prompt from dropped portal link data.
 */
export function buildAnalysisPrompt(data: PortalDragData): string {
  const descPart = data.desc ? `\u7b80\u4ecb\uff1a${data.desc}\u3002` : ''
  return `\u8bf7\u5e2e\u6211\u5206\u6790\u8fd9\u4e2a\u7f51\u7ad9\uff1a${data.name} (${data.url})\u3002${descPart}\u8bf7\u4ece\u4ee5\u4e0b\u89d2\u5ea6\u5206\u6790\uff1a\n1) \u7f51\u7ad9\u4e3b\u8981\u5185\u5bb9\u548c\u7528\u9014\n2) \u76ee\u6807\u7528\u6237\u7fa4\u4f53\n3) \u6838\u5fc3\u529f\u80fd\u7279\u70b9\n4) \u5bf9\u6211\u7684\u5de5\u4f5c\u6216\u7814\u7a76\u53ef\u80fd\u6709\u4ec0\u4e48\u5e2e\u52a9`
}

/**
 * Parse portal drag data from a DragEvent.
 * Returns null if the event does not contain valid portal data.
 */
export function parseDropData(e: DragEvent): PortalDragData | null {
  const raw = e.dataTransfer?.getData(DRAG_MIME)
  if (!raw) return null
  try {
    return JSON.parse(raw) as PortalDragData
  } catch {
    return null
  }
}

/**
 * Check if a DragEvent contains portal link data.
 * Use this during dragenter/dragover to show visual feedback.
 */
export function hasPortalData(e: DragEvent): boolean {
  return e.dataTransfer?.types.includes(DRAG_MIME) ?? false
}
