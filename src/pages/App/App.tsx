import {ConverterCard} from "../../components/ConverterCard/ConverterCard.tsx";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle.tsx";
import {ContentWrapper, Page, TopBar} from "./App.styled.ts";
import Title from "../../components/Title/Title.tsx";
import Footer from "../../components/Footer/Footer.tsx";

const App = () => (
    <Page>
        <TopBar>
            <ThemeToggle/>
        </TopBar>
        <ContentWrapper>
            <Title/>
            <ConverterCard/>
        </ContentWrapper>
        <Footer/>
    </Page>
);

export default App;
