/**
 * Unit tests for useChatApi SSE streaming functions
 * Tests parseSSEChunk and sendStreamMessage
 */

import { describe, it, expect } from "vitest"
import { parseSSEChunk } from "../useChatApi"

describe("parseSSEChunk", () => {
  it("should extract content delta from SSE data line", () => {
    const line = "data: {\"choices\":[{\"delta\":{\"content\":\"Hello\"},\"finish_reason\":null}]}"
    const result = parseSSEChunk(line)
    expect(result).toBe("Hello")
  })

  it("should return null for [DONE] signal", () => {
    const result = parseSSEChunk("data: [DONE]")
    expect(result).toBeNull()
  })

  it("should return null for empty data line", () => {
    const result = parseSSEChunk("data: ")
    expect(result).toBeNull()
  })

  it("should return null for malformed JSON", () => {
    const result = parseSSEChunk("data: {invalid json}")
    expect(result).toBeNull()
  })

  it("should return null for lines not starting with data:", () => {
    const result = parseSSEChunk("event: message")
    expect(result).toBeNull()
  })

  it("should return null for delta without content (role-only)", () => {
    const line = "data: {\"choices\":[{\"delta\":{\"role\":\"assistant\"},\"finish_reason\":null}]}"
    const result = parseSSEChunk(line)
    expect(result).toBeNull()
  })

  it("should handle multi-token content", () => {
    const line = "data: {\"choices\":[{\"delta\":{\"content\":\"Hello world\"},\"finish_reason\":null}]}"
    const result = parseSSEChunk(line)
    expect(result).toBe("Hello world")
  })

  it("should return null for empty string", () => {
    const result = parseSSEChunk("")
    expect(result).toBeNull()
  })

  it("should handle finish_reason stop with no content", () => {
    const line = "data: {\"choices\":[{\"delta\":{},\"finish_reason\":\"stop\"}]}"
    const result = parseSSEChunk(line)
    expect(result).toBeNull()
  })
})
