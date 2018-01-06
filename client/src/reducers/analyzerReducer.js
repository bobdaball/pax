const initialState = {
  analyzeUrl: true,
  analyzeText: false,
  error: null,
  height: 400,
  id: null,
  init: true,
  score: null,
  sentiment: null,
  success: false,
  summary: null,
  title: null,
  tone: null,
  waiting: false,
  width: 800,
};

export default function analyzer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ANALYZE_VIEW':
      return { ...state, success: false, waiting: false };
    case 'TOGGLE_URL_TRUE':
      return { ...state, analyzeUrl: false, analyzeText: true };
    case 'TOGGLE_TEXT_TRUE':
      return { ...state, analyzeUrl: true, analyzeText: false };
    case 'ANALYSIS_SUBMITTED':
      return {
        ...state, success: false, waiting: true, init: false,
      };
    case 'RESULTS_FULFILLED':
      return {
        ...state,
        id: action.payload.id,
        score: action.payload.score,
        sentiment: action.payload.sentiment,
        summary: action.payload.summary,
        title: action.payload.title,
        tone: action.payload.tone,
      };
    case 'ANALYSIS_FULFILLED':
      return { ...state, success: true, waiting: false };
    default:
      return state;
  }
}
