import { useActiveBreakpoint } from "figma:react";
import imgHeroImage from "figma:asset/df27fb1b971dffe928c194d3b69bceace8012400.png";
import imgImage from "figma:asset/5dc5b89d5bb6610e0c3299ca165a3fdf4a1f104d.png";
type ButtonPrimaryProps = {
  className?: string;
  label?: string;
  state?: "Default" | "Hover";
};

function ButtonPrimary({ className, label = "Request a demo", state = "Default" }: ButtonPrimaryProps) {
  const isDefault = state === "Default";
  const isHover = state === "Hover";
  return (
    <div className={className}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center p-[16px] relative">
          <div className={`bg-white shrink-0 size-[4px] ${isHover ? "opacity-80" : ""}`} data-name="Bullet" />
          {isDefault && <p className="css-ew64yg font-['Geist_Mono:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[14px] text-white">{label}</p>}
          {isHover && <p className="css-ew64yg font-['Geist_Mono:Medium',sans-serif] font-medium leading-none opacity-80 relative shrink-0 text-[14px] text-white">{label}</p>}
        </div>
      </div>
    </div>
  );
}

function HeaderMobile() {
  return (
    <div className="content-stretch flex flex-col items-center leading-none relative shrink-0 text-[80px] w-full" data-name="Header">
      <h1 className="block css-4hzbpn font-['Source_Serif_Pro:Regular',sans-serif] not-italic relative shrink-0 tracking-[-3.2px] w-full">Sustainability insights,</h1>
      <h2 className="block css-4hzbpn font-['Radio_Canada_Big:Regular',sans-serif] font-normal relative shrink-0 tracking-[-4px] w-full">built for business</h2>
    </div>
  );
}

function HeaderTextMobile() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 text-black text-center w-full" data-name="Header text">
      <HeaderMobile />
      <p className="css-4hzbpn font-['Source_Serif_Pro:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[20px] tracking-[-0.8px] w-full">Track impact, reduce emissions, and accelerate progress—with clarity and confidence.</p>
    </div>
  );
}

function ButtonRowMobile() {
  return (
    <div className="content-stretch cursor-pointer flex flex-col gap-[12px] items-center relative shrink-0" data-name="Button row">
      <ButtonPrimary className="bg-black relative shrink-0" />
      <ButtonPrimary className="bg-black relative shrink-0" label="Explore the platform" />
    </div>
  );
}

function IntroContentMobile() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[480px] relative shrink-0 w-full" data-name="Intro content">
      <HeaderTextMobile />
      <ButtonRowMobile />
    </div>
  );
}

function IntroSectionMobile() {
  return (
    <header className="relative shrink-0 w-full" data-name="Intro section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center pb-0 pt-[120px] px-[20px] relative w-full">
          <IntroContentMobile />
          <div className="aspect-[1920/1216] pointer-events-none relative rounded-[12px] shrink-0 w-full" data-name="Hero image">
            <img alt="Software dashboard showing sustainability metrics including energy use, emissions trend, and goal progress" className="absolute inset-0 max-w-none object-cover rounded-[12px] size-full" src={imgHeroImage} />
            <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 rounded-[12px]" />
          </div>
        </div>
      </div>
    </header>
  );
}

function ImageMobile() {
  return (
    <div className="aspect-[335/242] relative shrink-0 w-full" data-name="Image">
      <img alt="UI card displaying energy consumption data on a light fabric background" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function HeaderMobile1() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Track</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">001</p>
    </li>
  );
}

function ListItem1Mobile() {
  return (
    <ul className="content-stretch flex flex-col gap-[12px] items-start px-0 py-[20px] relative shrink-0 w-full" data-name="List item 1">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderMobile1 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Emissions, energy, and waste across your value chain</p>
      </li>
    </ul>
  );
}

function HeaderMobile2() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Model</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">002</p>
    </li>
  );
}

function ListItem2Mobile() {
  return (
    <ul className="content-stretch flex flex-col gap-[12px] items-start px-0 py-[20px] relative shrink-0 w-full" data-name="List item 2">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderMobile2 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Forecast performance and goal alignment</p>
      </li>
    </ul>
  );
}

function HeaderMobile3() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Report</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">003</p>
    </li>
  );
}

function ListItem3Mobile() {
  return (
    <ul className="content-stretch flex flex-col gap-[12px] items-start px-0 py-[20px] relative shrink-0 w-full" data-name="List item 3">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderMobile3 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Generate ESG disclosures, automate frameworks</p>
      </li>
    </ul>
  );
}

function HeaderMobile4() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Act</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">004</p>
    </li>
  );
}

function ListItem4Mobile() {
  return (
    <ul className="content-stretch flex flex-col gap-[12px] items-start px-0 py-[20px] relative shrink-0 w-full" data-name="List item 4">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-b border-solid border-t inset-0 pointer-events-none" />
      <HeaderMobile4 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Surface insights and operational next steps</p>
      </li>
    </ul>
  );
}

function ItemListMobile() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item list">
      <ListItem1Mobile />
      <ListItem2Mobile />
      <ListItem3Mobile />
      <ListItem4Mobile />
    </div>
  );
}

function FeatureListMobile() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Feature list">
      <ItemListMobile />
      <ButtonPrimary className="bg-black cursor-pointer relative shrink-0 w-full" label="Explore features" />
    </div>
  );
}

function ContentMobile() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[1500px] relative shrink-0 w-full" data-name="Content">
      <ImageMobile />
      <FeatureListMobile />
    </div>
  );
}

function FeaturesSectionMobile() {
  return (
    <main className="relative shrink-0 w-full" data-name="Features section" tabIndex="-1">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center px-[20px] py-[40px] relative w-full">
          <h2 className="block css-4hzbpn font-['Radio_Canada_Big:Medium',sans-serif] font-medium leading-none max-w-[612px] relative shrink-0 text-[40px] text-black text-center tracking-[-1.2px] w-full">Everything you need to measure, model, and act on sustainability</h2>
          <ContentMobile />
        </div>
      </div>
    </main>
  );
}

function IntroFeaturesSectionMobile() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Intro + Features section">
      <div className="absolute bg-gradient-to-b from-[#a8d3ff] inset-[0_0_65.24%_0] to-[#fff4df]" data-name="Gradient background" />
      <IntroSectionMobile />
      <FeaturesSectionMobile />
    </div>
  );
}

function HeaderTablet() {
  return (
    <div className="content-stretch flex flex-col items-center leading-none pb-[4px] pt-0 px-0 relative shrink-0 text-[80px] w-full" data-name="Header">
      <h1 className="block css-4hzbpn font-['Source_Serif_Pro:Regular',sans-serif] not-italic relative shrink-0 tracking-[-3.2px] w-full">Sustainability insights,</h1>
      <h2 className="block css-4hzbpn font-['Radio_Canada_Big:Regular',sans-serif] font-normal relative shrink-0 tracking-[-4px] w-full">built for business</h2>
    </div>
  );
}

function HeaderTextTablet() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-black text-center w-full" data-name="Header text">
      <HeaderTablet />
      <p className="css-4hzbpn font-['Source_Serif_Pro:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[20px] tracking-[-0.8px] w-full">Track impact, reduce emissions, and accelerate progress—with clarity and confidence.</p>
    </div>
  );
}

function ButtonRowTablet() {
  return (
    <div className="content-stretch cursor-pointer flex gap-[16px] items-center relative shrink-0" data-name="Button row">
      <ButtonPrimary className="bg-black relative shrink-0" />
      <ButtonPrimary className="bg-black relative shrink-0" label="Explore the platform" />
    </div>
  );
}

function IntroContentTablet() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center max-w-[760px] relative shrink-0 w-full" data-name="Intro content">
      <HeaderTextTablet />
      <ButtonRowTablet />
    </div>
  );
}

function IntroSectionTablet() {
  return (
    <header className="relative shrink-0 w-full" data-name="Intro section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[56px] items-center pb-0 pt-[140px] px-[20px] relative w-full">
          <IntroContentTablet />
          <div className="h-[481.333px] pointer-events-none relative rounded-[20px] shrink-0 w-[760px]" data-name="Hero image">
            <img alt="Software dashboard showing sustainability metrics including energy use, emissions trend, and goal progress" className="absolute inset-0 max-w-none object-cover rounded-[20px] size-full" src={imgHeroImage} />
            <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 rounded-[20px]" />
          </div>
        </div>
      </div>
    </header>
  );
}

function ImageTablet() {
  return (
    <div className="h-[500px] relative shrink-0 w-full" data-name="Image">
      <img alt="UI card displaying energy consumption data on a light fabric background" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function HeaderTablet1() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Track</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">001</p>
    </li>
  );
}

function ListItem1Tablet() {
  return (
    <ul className="content-stretch flex flex-col gap-[16px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="List item 1">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderTablet1 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Emissions, energy, and waste across your value chain</p>
      </li>
    </ul>
  );
}

function HeaderTablet2() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Model</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">002</p>
    </li>
  );
}

function ListItem2Tablet() {
  return (
    <ul className="content-stretch flex flex-col gap-[16px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="List item 2">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderTablet2 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Forecast performance and goal alignment</p>
      </li>
    </ul>
  );
}

function HeaderTablet3() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Report</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">003</p>
    </li>
  );
}

function ListItem3Tablet() {
  return (
    <ul className="content-stretch flex flex-col gap-[16px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="List item 3">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderTablet3 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Generate ESG disclosures, automate frameworks</p>
      </li>
    </ul>
  );
}

function HeaderTablet4() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Act</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">004</p>
    </li>
  );
}

function ListItem4Tablet() {
  return (
    <ul className="content-stretch flex flex-col gap-[16px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="List item 4">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-b border-solid border-t inset-0 pointer-events-none" />
      <HeaderTablet4 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Surface insights and operational next steps</p>
      </li>
    </ul>
  );
}

function ItemListTablet() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item list">
      <ListItem1Tablet />
      <ListItem2Tablet />
      <ListItem3Tablet />
      <ListItem4Tablet />
    </div>
  );
}

function FeatureListTablet() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Feature list">
      <ItemListTablet />
      <ButtonPrimary className="bg-black cursor-pointer relative shrink-0 w-full" label="Explore features" />
    </div>
  );
}

function ContentTablet() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center max-w-[1500px] relative shrink-0 w-full" data-name="Content">
      <ImageTablet />
      <FeatureListTablet />
    </div>
  );
}

function FeaturesSectionTablet() {
  return (
    <main className="relative shrink-0 w-full" data-name="Features section" tabIndex="-1">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[20px] py-[80px] relative w-full">
          <h2 className="block css-4hzbpn font-['Radio_Canada_Big:Medium',sans-serif] font-medium leading-none max-w-[612px] relative shrink-0 text-[40px] text-black text-center tracking-[-1.2px] w-full">Everything you need to measure, model, and act on sustainability</h2>
          <ContentTablet />
        </div>
      </div>
    </main>
  );
}

function IntroFeaturesSectionTablet() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Intro + Features section">
      <div className="absolute bg-gradient-to-b from-[#a8d3ff] inset-[0_0_65.89%_0] to-[#fff4df]" data-name="Gradient background" />
      <IntroSectionTablet />
      <FeaturesSectionTablet />
    </div>
  );
}

function HeaderDesktop() {
  return (
    <div className="content-stretch flex flex-col items-center leading-none pb-[8px] pt-0 px-0 relative shrink-0 text-[80px] w-full" data-name="Header">
      <h1 className="block css-4hzbpn font-['Source_Serif_Pro:Regular',sans-serif] not-italic relative shrink-0 tracking-[-3.2px] w-full">Sustainability insights,</h1>
      <h2 className="block css-4hzbpn font-['Radio_Canada_Big:Regular',sans-serif] font-normal relative shrink-0 tracking-[-4px] w-full">built for business</h2>
    </div>
  );
}

function HeaderTextDesktop() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-black text-center w-full" data-name="Header text">
      <HeaderDesktop />
      <p className="css-4hzbpn font-['Source_Serif_Pro:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[20px] tracking-[-0.8px] w-full">Track impact, reduce emissions, and accelerate progress—with clarity and confidence.</p>
    </div>
  );
}

function ButtonRowDesktop() {
  return (
    <div className="content-stretch cursor-pointer flex gap-[16px] items-center relative shrink-0" data-name="Button row">
      <ButtonPrimary className="bg-black relative shrink-0" />
      <ButtonPrimary className="bg-black relative shrink-0" label="Explore the platform" />
    </div>
  );
}

function IntroContentDesktop() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center max-w-[1030px] relative shrink-0 w-full" data-name="Intro content">
      <HeaderTextDesktop />
      <ButtonRowDesktop />
    </div>
  );
}

function IntroSectionDesktop() {
  return (
    <header className="relative shrink-0 w-full" data-name="Intro section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[56px] items-center pb-0 pt-[140px] px-[20px] relative w-full">
          <IntroContentDesktop />
          <div className="h-[608px] pointer-events-none relative rounded-[24px] shrink-0 w-[960px]" data-name="Hero image">
            <img alt="Software dashboard showing sustainability metrics including energy use, emissions trend, and goal progress" className="absolute inset-0 max-w-none object-cover rounded-[24px] size-full" src={imgHeroImage} />
            <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 rounded-[24px]" />
          </div>
        </div>
      </div>
    </header>
  );
}

function ImageDesktop() {
  return (
    <div className="h-[502px] relative shrink-0 w-[693px]" data-name="Image">
      <img alt="UI card displaying energy consumption data on a light fabric background" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function HeaderDesktop1() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Track</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">001</p>
    </li>
  );
}

function ListItem1Desktop() {
  return (
    <ul className="content-stretch flex flex-col gap-[16px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="List item 1">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderDesktop1 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Emissions, energy, and waste across your value chain</p>
      </li>
    </ul>
  );
}

function HeaderDesktop2() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Model</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">002</p>
    </li>
  );
}

function ListItem2Desktop() {
  return (
    <ul className="content-stretch flex flex-col gap-[16px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="List item 2">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderDesktop2 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Forecast performance and goal alignment</p>
      </li>
    </ul>
  );
}

function HeaderDesktop3() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Report</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">003</p>
    </li>
  );
}

function ListItem3Desktop() {
  return (
    <ul className="content-stretch flex flex-col gap-[16px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="List item 3">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-solid border-t inset-0 pointer-events-none" />
      <HeaderDesktop3 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Generate ESG disclosures, automate frameworks</p>
      </li>
    </ul>
  );
}

function HeaderDesktop4() {
  return (
    <li className="content-stretch flex gap-[16px] items-start leading-none p-0 relative shrink-0 w-full" data-name="Header">
      <h2 className="block css-4hzbpn flex-[1_0_0] font-['Radio_Canada_Big:Medium',sans-serif] font-medium min-h-px min-w-px relative text-[20px] text-black tracking-[-0.4px]">Act</h2>
      <p className="css-ew64yg font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#6c6c6c] text-[14px] text-right">004</p>
    </li>
  );
}

function ListItem4Desktop() {
  return (
    <ul className="content-stretch flex flex-col gap-[16px] items-start px-0 py-[24px] relative shrink-0 w-full" data-name="List item 4">
      <div aria-hidden="true" className="absolute border-[#dbe0ec] border-b border-solid border-t inset-0 pointer-events-none" />
      <HeaderDesktop4 />
      <li className="block font-['Source_Serif_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.8px] w-full">
        <p className="css-4hzbpn leading-[1.2]">Surface insights and operational next steps</p>
      </li>
    </ul>
  );
}

function ItemListDesktop() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item list">
      <ListItem1Desktop />
      <ListItem2Desktop />
      <ListItem3Desktop />
      <ListItem4Desktop />
    </div>
  );
}

function FeatureListDesktop() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Feature list">
      <ItemListDesktop />
      <ButtonPrimary className="bg-black cursor-pointer relative shrink-0" label="Explore features" />
    </div>
  );
}

function ContentDesktop() {
  return (
    <div className="content-stretch flex gap-[40px] items-center max-w-[1500px] relative shrink-0 w-full" data-name="Content">
      <ImageDesktop />
      <FeatureListDesktop />
    </div>
  );
}

function FeaturesSectionDesktop() {
  return (
    <main className="relative shrink-0 w-full" data-name="Features section" tabIndex="-1">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[20px] py-[120px] relative w-full">
          <h2 className="block css-4hzbpn font-['Radio_Canada_Big:Medium',sans-serif] font-medium leading-none max-w-[612px] relative shrink-0 text-[40px] text-black text-center tracking-[-1.2px] w-full">Everything you need to measure, model, and act on sustainability</h2>
          <ContentDesktop />
        </div>
      </div>
    </main>
  );
}

function IntroFeaturesSectionDesktop() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Intro + Features section">
      <div className="absolute bg-gradient-to-b from-[#a8d3ff] inset-[0_0_58.25%_0] to-[#fff4df]" data-name="Gradient background" />
      <IntroSectionDesktop />
      <FeaturesSectionDesktop />
    </div>
  );
}

function IntroFeaturesSection() {
  const { width } = useActiveBreakpoint();
  if (width < 800) {
    return <IntroFeaturesSectionMobile />;
  }
  if (width < 1280) {
    return <IntroFeaturesSectionTablet />;
  }
  return <IntroFeaturesSectionDesktop />;
}

export default IntroFeaturesSection;