const initialState = {
  analyzeUrl: true,
  analyzeText: false,
  error: null,
  height: 400,
  input: null,
  score: null,
  sentiment: null,
  success: false,
  tone: null,
  waiting: false,
  width: 800,
};

export default function analyzer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_URL_TRUE':
      return { ...state, analyzeUrl: false, analyzeText: true };
    case 'TOGGLE_TEXT_TRUE':
      return { ...state, analyzeUrl: true, analyzeText: false };
    case 'ANALYZE_INPUT':
      return { ...state, input: action.payload };
    case 'ANALYSIS_SUBMITTED':
      return { ...state, success: false, waiting: true };
    case 'RESULTS_FULFILLED':
      return {
        ...state,
        tone: action.payload.tone,
        score: action.payload.score,
        sentiment: action.payload.sentiment,
      };
    case 'ANALYSIS_FULFILLED':
      return { ...state, success: true, waiting: false };
    default:
      return state;
  }
}
