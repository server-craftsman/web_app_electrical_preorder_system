export interface CreateCampaignRequestModel {
  name: string; // @NotBlank
  startDate: string; // @NotNull, LocalDateTime
  endDate: string; // @NotNull, LocalDateTime
  minQuantity: number; // @NotNull, @Min(0), Integer
  maxQuantity: number; // @NotNull, @Min(0), Integer
  totalAmount: number; // @NotNull, @Min(0), BigDecimal
  status: string; // @NotBlank
  productId: string; // @NotBlank
}

//=============campaign stage=================================

export interface CreateCampaignStageRequestModel {
  name: string; // @NotBlank
  startDate: string; // @NotNull, LocalDateTime
  endDate: string; // @NotNull, LocalDateTime
  targetQuantity: number; // @NotNull, @Min(0), Integer
}
