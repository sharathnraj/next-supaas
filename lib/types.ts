import { ReactNode } from 'react';

export interface ImageData {
  id: string;
  title: string;
  url: string;
}

export interface BrandData {
  id: string;
  title: string;
  slug: string;
  roundedLogo: ImageData[];
}

export interface CategoryData {
  id: string;
  title: string;
  slug: string;
}

export interface SpecificationsTableData {
  key: string;
  value: string;
  header: boolean;
}

export interface ResourcesData {
  id: string;
  title: string;
  slug: string;
  resourceImage: ImageData[];
  resourceDescription: string;
  resourceFile: ImageData[];
  openAtPage: string;
}

export interface AccordionListItemData {
  id: string;
  title: string;
  slug: string;
  bodyText: string;
  specificationsTable: SpecificationsTableData[];
  relatedResources: ResourcesData[];
}

export interface ChecklistItemData {
  checklistText: string | ReactNode;
  checklistHyperlinkText?: string;
  checklistHyperlink?: string;
}

export interface ModularContentTableData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  downloadableResourceList?: ResourcesData[];
}

export interface ModularContentTableChecklistData
  extends ModularContentTableData {
  __typename: 'checklistComponent_Entry';
  checklist: ChecklistItemData[];
}

export interface ModularContentTableTextData extends ModularContentTableData {
  __typename: 'textComponent_Entry';
}

export interface ModularContentTableVideoData extends ModularContentTableData {
  __typename: 'videoComponent_Entry';
  youtubeUrl: string;
}

export interface ModularContentTableImageAndSpecsData
  extends ModularContentTableData {
  __typename: 'imageAndSpecsComponent_Entry';
  specificationsTable: SpecificationsTableData[];
  imageCarousel: ImageData[];
}

export interface ModularContentTableRelatedProductsData
  extends ModularContentTableData {
  __typename: 'relatedProductsComponent_Entry';
  productAndPartsList: ProductData[];
}

export interface ModularContentTableDownloadableResourcesData
  extends ModularContentTableData {
  __typename: 'downloadableResourcesComponent_Entry';
  downloadableResourceList: ResourcesData[];
}

export interface ProductContentSectionData {
  __typename: 'productContentSection_Entry';
  id: string;
  title: string;
  slug: string;
  description?: string;
  sectionIcon?: string;
  showMaxProductInformation: boolean;
  accordionList: AccordionListItemData[];
  downloadableResourceList: ResourcesData[];
  showModuleTableNavigation: boolean;
  modularContentTable: (
    | ModularContentTableImageAndSpecsData
    | ModularContentTableChecklistData
    | ModularContentTableRelatedProductsData
    | ModularContentTableDownloadableResourcesData
  )[];
}

export interface GeneralContactInformationData {
  id: string;
  title: string;
  slug: string;
  roleOrPosition: string;
  businessName: string;
  contactHours: string;
  contactLink: string;
}

export interface TroubleshootingIssueType {
  id: string;
  title: string;
  slug: string;
  issueGroupsHeading: string;
  issueGroups: TroubleshootingIssueGroup[];
  issueTypeIcon: string;
}

export interface TroubleshootingIssueGroup {
  id: string;
  title: string;
  slug: string;
  issueDescription: string;
  issueListHeading: string;
  issueList: TroubleshootingIssue[];
  roundedImage: ImageData[];
}

export interface TroubleshootingIssue {
  id: string;
  title: string;
  slug: string;
  issueDescription: string;
  issueResolutions: TroubleshootingIssueResolution[];
  showAsQuickLink: boolean;
}

export interface TroubleshootingIssueResolution {
  id: string;
  slug: string;
  resolutionInformation: string;
  actionsToTake: string;
  possibleCause: string;
  relevantContact: GeneralContactInformationData[];
}

export interface ProductTroubleshootingSectionData {
  __typename: 'productTroubleshootingSection_Entry';
  id: string;
  title: string;
  slug: string;
  generalContactInformation: GeneralContactInformationData[];
  issueTypes: TroubleshootingIssueType[];
}

export interface ProductData {
  __typename: 'product_Entry';
  id: string;
  title: string;
  slug: string;
  productImage: ImageData[];
  productBrand: BrandData[];
  productCategories: CategoryData[];
  productCode?: string;
  maxLink?: string;
  productContentSectionTable: (
    | ProductContentSectionData
    | ProductTroubleshootingSectionData
  )[];
  globalFeaturedLinkCardList: FeaturedLinkCardData[];
}

export interface FeaturedLinkCardData {
  id: string;
  title: string;
  slug: string;
  plainTextDescription: string;
  thumbnailImage: ImageData[];
  primaryLink: ProductData[];
  secondaryLinkListTitle?: string;
  secondaryLinkList?: (ProductData | LearnLandingData)[];
}

export interface ProductLandingData {
  id: string;
  title: string;
  slug: string;
  landingPageImage: ImageData[];
  FeaturedLinkCardSectionHeading: string;
  featuredLinkCardList: FeaturedLinkCardData[];
  productSupportGroupList: {
    id: string;
    title: string;
    slug: string;
    productCategories: {
      id: string;
      title: string;
      slug: string;
    }[];
  }[];
}

export interface FeaturedLinksData {
  id: string;
  title: string;
  slug: string;
  featuredLinkCardList: FeaturedLinkCardData[];
}

export interface LearnData {
  __typename:
    | 'learningGuide_Entry'
    | 'learningArticle_Entry'
    | 'learningVideo_Entry';
  id: string;
  title: string;
  slug: string;
  thumbnailImage: ImageData[];
  globalFeaturedLinkCardList: FeaturedLinkCardData[];
}

export interface LearnDataVideo extends LearnData {
  __typename: 'learningVideo_Entry';
  youtubeUrl: string;
  videoDuration: string;
  leadText: string;
  bodyText: string;
}

export interface ModularArticleTableDataBodyText {
  __typename: 'articleBodyTextComponent_Entry';
  id: string;
  title: string;
  slug: string;
  bodyText: string;
}

export interface ModularArticleTableDataImage {
  __typename: 'articleImageComponent_Entry';
  id: string;
  title: string;
  slug: string;
  featuredImage: ImageData[];
}

export interface LearnDataArticle extends LearnData {
  __typename: 'learningArticle_Entry';
  leadText: string;
  heroImage: ImageData[];
  readTime: string;
  modularArticleTable: (
    | ModularArticleTableDataBodyText
    | ModularArticleTableDataImage
  )[];
}

export interface LearnDataGuide extends LearnData {
  __typename: 'learningGuide_Entry';
  pageDescription: string;
  readTime: string;
  showModuleTableNavigation: boolean;
  codeEmbed: string | null;
  modularContentTable: (
    | ModularContentTableImageAndSpecsData
    | ModularContentTableChecklistData
    | ModularContentTableTextData
    | ModularContentTableVideoData
    | ModularContentTableRelatedProductsData
    | ModularContentTableDownloadableResourcesData
  )[];
}

export interface LearnLandingData {
  __typename: 'learnLanding_Entry';
  id: string;
  title: string;
  slug: string;
  featuredSeries: LearnSeriesData[];
  allSeries: LearnSeriesData[];
  globalFeaturedLinkCardList: FeaturedLinkCardData[];
}

export interface LearnSeriesData {
  __typename: 'learnSeries_Entry';
  id: string;
  title: string;
  slug: string;
  thumbnailImage: ImageData[];
  learnContentList: (LearnDataVideo | LearnDataGuide | LearnDataArticle)[];
  relatedSeries: LearnSeriesData[];
  globalFeaturedLinkCardList: FeaturedLinkCardData[];
}

export interface RebatesContentSectionData {
  id: string;
  title: string;
  slug: string;
  sectionIcon: string;
  sectionDescription: string;
}

export interface RebatesContentSectionDataInternal
  extends RebatesContentSectionData {
  __typename: 'rebatesInternalContentSection_Entry';
  learnContent: (LearnDataVideo | LearnDataGuide | LearnDataArticle)[];
}

export interface RebatesContentSectionDataExternal
  extends RebatesContentSectionData {
  __typename: 'rebatesExternalContentSection_Entry';
  externalLink: string;
}

export interface RebatesLandingData {
  id: string;
  title: string;
  slug: string;
  description: string;
  rebatesContentSections: (
    | RebatesContentSectionDataInternal
    | RebatesContentSectionDataExternal
  )[];
  relatedLearning: (LearnDataVideo | LearnDataGuide | LearnDataArticle)[];
  featuredLinkCardList: FeaturedLinkCardData[];
}
