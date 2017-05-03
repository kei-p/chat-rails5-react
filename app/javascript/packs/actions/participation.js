const FETCH_PARTICIPATIONS = 'FETCH_PARTICIPATIONS';
const UPDATE_PARTICIPATIONS = 'UPDATE_PARTICIPATIONS';

export function fetchParticipations(participations) {
  return {
    type: FETCH_PARTICIPATIONS,
    participations: participations
  };
}
