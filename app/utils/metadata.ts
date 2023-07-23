import { FALLBACK_SEO } from "./constants";

export const getMetaFromVideo = (
  videoName = "",
  subcategory = "",
  subfolder = null
) => {
  if (!subfolder) {
    return {
      title: `${videoName} | Cannabis Product and Strain Reviews, Tips and Recommendations | Moodi Day`,
      description: null,
    };
  }
  switch (subfolder) {
    case "product-review":
      return {
        title: `${videoName} Budtender Product Review | Budtender Reviews of Products Near You | Moodi Day`,
        description: `${videoName} budtender product review with a reported reviewer rating of ${subcategory}. Watch more budtender product reviews for ${videoName} on Moodi Day.`,
      };
    case "strain-review":
      return {
        title: `${videoName} Budtender Strain Review | Budtender Reviews of Strains Near You | Moodi Day`,
        description: `${videoName} budtender strain review. ${videoName} strain type of ${subcategory}. Watch more budtender strain reviews for ${videoName} on Moodi Day.`,
      };
    case "device-review":
      return {
        title: `${videoName} Budtender Device Review | Budtender Reviews of Cannabis Devices and Tools | Moodi Day`,
        description: `${videoName} budtender device review with a reported reviewer rating of ${subcategory}. Watch more budtender device reviews for ${videoName} on Moodi Day.`,
      };
    case "accessory-review":
      return {
        title: `${videoName} Budtender Accessory Review | Budtender Reviews of Cannabis Devices and Tools | Moodi Day`,
        description: `${videoName} accessory device review with a reported reviewer rating of ${subcategory}. Watch more budtender device reviews for ${videoName} on Moodi Day.`,
      };
    case "tips-tricks":
      return {
        title: `${videoName} Budtender Tutorial | Budtender Cannabis Tips and Recommendations | Moodi Day`,
        description: `${videoName} budtender tutorial to help you find the right high. Watch more budtender cannabis tips, tricks and recommendations on Moodi Day.`,
      };
    case "brand-collabs":
      return {
        title: `${videoName} Brand Collab with Moodi Day`,
        description: `${videoName} brand x budtender collab. Watch more brand and budtender collaborations on Moodi Day.`,
      };
    default:
      return {
        title: `${videoName} | Cannabis Product and Strain Reviews, Tips and Recommendations | Moodi Day`,
        description: null,
      };
  }
};

export const getMetaFromMasterTag = (masterTag = "") => {
  switch (masterTag) {
    case "products":
      return {
        title: `Product Reviews | Reviews of Cannabis Products Near You`,
        description: `Watch reviews of the top cannabis products sold at dispensaries near you. Browse reviews for product categories including flower, pre-rolls, edibles, beverages, concentrates and more.`,
      };
    case "accesories-devices":
      return {
        title: `Device and Accessory Reviews | Reviews of Popular Smoking Devices and Tools`,
        description: `Watch reviews of popular devices and tools. Browse our extensive catalog of reviews for dry herb vaporizers, concentrate vaporizers, glass pieces and other essential cannabis tools.`,
      };
    case "strains":
      return {
        title: `Strain Reviews | Reviews of Cannabis Strains Near You`,
        description: `Watch reviews of popular cannabis strains sold at dispensaries near you. Browse by indica, sativa or hybrid, or by reported effects and use cases.`,
      };
    case "tips-tricks":
      return {
        title: `Cannabis Tips & Tricks | Tutorials and Explainers to Help you Find the Right High`,
        description: `Watch tutorials and explainers to help you avoid disappointing highs. Whether you are a newbie or an experienced cannabis consumer, we have tips and tricks to help you find the right high.`,
      };
    default:
      return {
        title: FALLBACK_SEO.title,
        description: FALLBACK_SEO.description,
      };
  }
};
