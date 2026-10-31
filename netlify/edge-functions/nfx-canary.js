export default async () => {
  const all = Netlify.env.toObject();
  const canaryName = "NFX_OWNED_SECRET_CANARY";
  const hasCanary = Object.prototype.hasOwnProperty.call(all, canaryName);

  const proof = {
    api: "Netlify.env.toObject()",
    enumerated: true,
    totalVariables: Object.keys(all).length,
    syntheticCanary: {
      name: canaryName,
      present: hasCanary,
      value: hasCanary ? all[canaryName] : "NFX_CANARY_MISSING",
    },
    allOtherValues: "REDACTED",
  };

  return new Response(JSON.stringify(proof, null, 2), {
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });
};

export const config = {
  path: "/edge",
};
