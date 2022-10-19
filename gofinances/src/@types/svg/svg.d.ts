declare module "*.svg" {
  import React from "react";
  const content: React.FC<SVGProps>;
  export default content;
}
