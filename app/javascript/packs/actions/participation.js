const FETCH_PARTICIPATIONS = 'FETCH_PARTICIPATIONS';


export function fetchParticipations(participations) {
  return {
    type: FETCH_PARTICIPATIONS,
    participations: participations
  };
}
