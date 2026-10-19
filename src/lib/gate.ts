/* The welcome gate is the only way into the site. Passing it sets this session cookie; the proxy reads it on every page
   request and tells the home page, through this request header, whether the gate is "open" or still "closed". */
export const GATE_COOKIE = "syvursoft_gate";
export const GATE_PASSED = "passed";
export const GATE_HEADER = "x-syvursoft-gate";
