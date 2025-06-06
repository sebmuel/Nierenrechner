export const GenderFactors = {
  maennlich: {
    mdrd: 1,
    mayoQuadratic: 0,
    ckdEpiK: 0.9,
    ckdEpiA: -0.302,
    ckdEpi: 1,
    ckdEpiCys: 1,
    cockcroftGault: 1,
  },
  weiblich: {
    mdrd: 0.742,
    mayoQuadratic: 0.205,
    ckdEpiK: 0.7,
    ckdEpiA: -0.241,
    ckdEpi: 1.012,
    ckdEpiCys: 0.932,
    cockcroftGault: 0.85,
  },
} as const;
