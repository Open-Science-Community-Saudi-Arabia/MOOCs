import { Trans } from "@lingui/macro";
import verificationImage from "../../../images/verification-email-sent.jpg";
interface IProps {
  emailLink: string;
}

const VerificationLink = ({ emailLink }: IProps) => {
  return (
    <div className="verificationLink">
      <img
        className="verificationLink__img"
        src={verificationImage}
        alt="illustration"
      />

      <div className="verificationLink__content">
        <h2 className="verificationLink__content__title">
          <Trans> Your verification link is in your email! </Trans>
        </h2>
        <p className="verificationLink__content__desc">
          <Trans> We have sent it to</Trans>
          <span className="verificationLink__content__desc-link">
            {" "}
            {emailLink}
          </span>
        </p>
        <p className="verificationLink__content__checkmail">
          {" "}
          <Trans> Check your mail to continue </Trans>{" "}
        </p>
      </div>
    </div>
  );
};

export default VerificationLink;
