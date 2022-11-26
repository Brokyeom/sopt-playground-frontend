import styled from '@emotion/styled';
import { FC } from 'react';

import { LinkTitle, ProjectLink } from '@/api/projects/type';
import Text from '@/components/common/Text';
import { categoryLabel, getLinkInfo } from '@/components/projects/upload/constants';
import { Category, ServiceType } from '@/components/projects/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export interface ProjectCardProps {
  serviceType: ServiceType[];
  name: string;
  category: Category;
  generation?: number;
  summary: string;
  thumbnailImage?: string;
  logoImage: string;
  links: ProjectLink[];
  onClick: () => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  category,
  generation,
  serviceType,
  summary,
  thumbnailImage,
  logoImage,
  links,
  onClick,
}) => {
  // FIXME: 서버측에서 링크 업로드 하지 않았을 경우 빈 배열이 아닌 속성에 null 이 담긴 link 배열이 내려와 임시 대응 (https://github.com/sopt-makers/internal-server/issues/32)
  const filteredLinks = links.filter(({ linkId, linkTitle, linkUrl }) => linkId && linkTitle && linkUrl);

  return (
    <StyledCard onClick={onClick}>
      <StyledServiceTypeWrapper>
        {serviceType.map((serviceType, index) => (
          <StyledServiceType key={index}>{serviceType}</StyledServiceType>
        ))}
      </StyledServiceTypeWrapper>
      <StyledImageSection>
        {thumbnailImage ? (
          <StyledThumbnail
            className='card-image'
            src={thumbnailImage}
            alt='thumbnail-image'
            loading='lazy'
            decoding='async'
          />
        ) : (
          <StyledLogo className='card-image' src={logoImage} alt='logo-image' loading='lazy' decoding='async' />
        )}
        <ServiceLinkWrapper className='card-hover'>
          {filteredLinks.map(({ linkId, linkTitle, linkUrl }) => (
            <StyledServiceLink key={linkId} href={linkUrl} onClick={(e) => e.stopPropagation()}>
              <StyledLinkIcon alt='link-icon' src={getLinkInfo(linkTitle as LinkTitle)?.icon} />
              <Text typography='SUIT_12_SB'>{getLinkInfo(linkTitle as LinkTitle)?.label}</Text>
            </StyledServiceLink>
          ))}
        </ServiceLinkWrapper>
      </StyledImageSection>
      <StyledContent>
        <StyledTitleWrapper>
          <Text typography='SUIT_18_B'>{name}</Text>
          <Text typography='SUIT_12_SB' color={colors.gray100}>
            {generation ? `${generation}기 ${categoryLabel[category]}` : categoryLabel[category]}
          </Text>
        </StyledTitleWrapper>
        <Text typography='SUIT_14_M' color={colors.gray60}>
          {summary}
        </Text>
      </StyledContent>
    </StyledCard>
  );
};

export default ProjectCard;

const StyledCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${colors.black80};
  cursor: pointer;
  padding: 6px;
  width: 380px;
  height: 292px;

  :hover {
    & .card-hover {
      transition: visibility 0.3s linear, opacity 0.3s linear;
      visibility: visible;
      opacity: 1;
    }

    & .card-image {
      transition: opacity 0.2s;
      opacity: 0.8;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 355px;
    height: 276px;
  }
`;

const StyledServiceTypeWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  left: 20px;
  align-items: center;
  z-index: 1;

  & > * {
    :not(:first-child) {
      margin-left: 6px;
    }
  }
`;

const StyledServiceType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2000px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
  background-color: rgb(252 252 252 / 70%);
  width: 54px;
  height: 23px;
  color: ${colors.black40};
  ${textStyles.SUIT_12_B};
`;

const StyledImageSection = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 208px;
`;

const ServiceLinkWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 60px;
  gap: 16px;
  visibility: hidden;
  opacity: 0;
`;

const StyledLinkIcon = styled.img`
  border-radius: 10px;
  background-color: ${colors.black100};
  width: 54px;
  height: 54px;
`;

const StyledServiceLink = styled.a`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const StyledThumbnail = styled.img`
  border-radius: 6px;
  background: linear-gradient(180deg, rgb(35 35 50 / 0%) 0%, rgb(35 35 35 / 80%) 100%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  content-visibility: auto;
`;

const StyledLogo = styled.img`
  margin: 44px 0 0;
  border-radius: 20px;
  width: 120px;
  height: 120px;
`;

const StyledContent = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 12px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
