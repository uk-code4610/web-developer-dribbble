export const categories = [
  { value: "crud", label: "CRUD" },
  { value: "search", label: "検索" },
  { value: "manage", label: "管理系" },
  { value: "sns", label: "SNS系" },
  { value: "other", label: "その他" },
];

export const categoryLabels: Record<string, string> = {
  crud: "CRUD",
  search: "検索",
  manage: "管理系",
  sns: "SNS系",
  other: "その他",
};
export const categoryClasses: Record<string, string> = {
  crud: "bg-[#E8F2FF] text-[#1E4FA8] border-[#CFE3FF]",
  search: "bg-[#EAFBF2] text-[#166534] border-[#C7F1DB]",
  manage: "bg-[#F3ECFF] text-[#5B21B6] border-[#E2D6FF]",
  sns: "bg-[#FFF0F6] text-[#9D174D] border-[#FFD0E1]",
  other: "bg-[#F2F4F7] text-[#344054] border-[#E4E7EC]",
};
