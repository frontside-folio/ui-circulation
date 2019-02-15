import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { getPeriod } from '../../network/factories/loan-policy';
import setupApplication from '../../helpers/setup-application';
import LoanPolicyDetail from '../../interactors/loan-policy/loan-policy-detail';
import translation from '../../../../translations/ui-circulation/en.json'; // eslint-disable-line import/extensions
import {
  shortTermLoansOptions,
  longTermLoansOptions,
  renewFromOptions,
} from '../../../../constants';
import {
  getBooleanRepresentation,
  getOptionsRepresentation,
} from '../../helpers/messageСonverters';

describe('LoanPolicyDetail', () => {
  setupApplication();

  let loanPolicy;

  describe.only('viewing loan policy', () => {
    describe('about section', () => {
      describe('loan policy:\n\t-loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('header', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.aboutSection.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyDetail.aboutSection.header.text).to.equal(translation['settings.loanPolicy.about']);
          });
        });

        describe('loan policy name', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.aboutSection.policyName.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.aboutSection.policyName.label.text).to.equal(translation['settings.loanPolicy.policyName']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.aboutSection.policyName.value.text).to.equal(loanPolicy.name);
          });
        });

        describe('loan policy description', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.aboutSection.policyDescription.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.aboutSection.policyDescription.label.text).to.equal(translation['settings.loanPolicy.policyDescription']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.aboutSection.policyDescription.value.text).to.equal(loanPolicy.description);
          });
        });
      });
    });

    describe('request management section', () => {
      describe('loan policy:\n\t-non loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: false,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });
        describe('request management section', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.requestManagement.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('header', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.requestManagement.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyDetail.requestManagement.header.text).to.equal(translation['settings.requestManagement.requestManagement']);
          });
        });

        describe('recalls', () => {
          describe('recall return interval', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.recallReturnInterval.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.recallReturnInterval.label.text).to.equal(translation['settings.requestManagement.recallReturnInterval']);
            });

            it('should have a proper value', () => {
              expect(LoanPolicyDetail.requestManagement.recallReturnInterval.value.text).to.equal(
                `${loanPolicy.requestManagement.recalls.recallReturnInterval.duration} ${loanPolicy.requestManagement.recalls.recallReturnInterval.intervalId}`
              );
            });
          });

          describe('minimum guaranteed loan period', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.minimumGuaranteedLoanPeriod.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.minimumGuaranteedLoanPeriod.label.text).to.equal(translation['settings.requestManagement.minimumGuaranteedLoanPeriod']);
            });

            it('should have a proper value', () => {
              expect(LoanPolicyDetail.requestManagement.minimumGuaranteedLoanPeriod.value.text).to.equal(
                `${loanPolicy.requestManagement.recalls.minimumGuaranteedLoanPeriod.duration} ${loanPolicy.requestManagement.recalls.minimumGuaranteedLoanPeriod.intervalId}`
              );
            });
          });
        });

        describe('holds', () => {
          describe('alternate checkout loan period', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.alternateCheckoutLoanPeriod.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.alternateCheckoutLoanPeriod.label.text).to.equal(translation['settings.requestManagement.alternateCheckoutLoanPeriod']);
            });

            it('should have a proper value', () => {
              expect(LoanPolicyDetail.requestManagement.alternateCheckoutLoanPeriod.value.text).to.equal(
                `${loanPolicy.requestManagement.holds.alternateCheckoutLoanPeriod.duration} ${loanPolicy.requestManagement.holds.alternateCheckoutLoanPeriod.intervalId}`
              );
            });
          });

          describe('renew items with request', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.renewItemsWithRequest.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.renewItemsWithRequest.label.text).to.equal(translation['settings.requestManagement.renewItemsWithRequest']);
            });

            it('should have a proper value', () => {
              expect(LoanPolicyDetail.requestManagement.renewItemsWithRequest.value.text).to.equal(
                getBooleanRepresentation(loanPolicy.requestManagement.holds.renewItemsWithRequest)
              );
            });
          });

          describe('alternate renewal loan period', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.alternateRenewalLoanPeriod.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.alternateRenewalLoanPeriod.label.text).to.equal(translation['settings.requestManagement.alternateRenewalLoanPeriod']);
            });

            it('should have a proper value', () => {
              expect(LoanPolicyDetail.requestManagement.alternateRenewalLoanPeriod.value.text).to.equal(
                `${loanPolicy.requestManagement.holds.alternateRenewalLoanPeriod.duration} ${loanPolicy.requestManagement.holds.alternateRenewalLoanPeriod.intervalId}`
              );
            });
          });
        });
      });
    });

    describe('loans section', () => {
      describe('loan policy:\n\t-loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('header', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyDetail.loansSection.header.text).to.equal(translation['settings.loanPolicy.loans']);
          });
        });

        describe('loan profile', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.loanProfile.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.loanProfile.label.text).to.equal(translation['settings.loanPolicy.loanProfile']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.loanProfile.value.text).to.equal(loanPolicy.loansPolicy.profileId);
          });
        });

        describe('closed library due date management', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.closedDueDateMgmt.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.closedDueDateMgmt.label.text).to.equal(translation['settings.loanPolicy.closedDueDateMgmt']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.closedDueDateMgmt.value.text).to.equal(
              getOptionsRepresentation(
                [
                  ...longTermLoansOptions,
                  ...shortTermLoansOptions,
                ],
                loanPolicy.loansPolicy.closedLibraryDueDateManagementId
              )
            );
          });
        });

        describe('grace period', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.gracePeriod.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.gracePeriod.label.text).to.equal(translation['settings.loanPolicy.gracePeriod']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.gracePeriod.value.text).to.equal(
              `${loanPolicy.loansPolicy.gracePeriod.duration} ${loanPolicy.loansPolicy.gracePeriod.intervalId}`
            );
          });
        });
      });

      describe('loan policy:\n\t-loanable\n\t-rolling\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
            loansPolicy: {
              profileId: 'Rolling',
              period: getPeriod,
            },
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('loan period', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.loanPeriod.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.loanPeriod.label.text).to.equal(translation['settings.loanPolicy.loanPeriod']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.loanPeriod.value.text).to.equal(
              `${loanPolicy.loansPolicy.period.duration} ${loanPolicy.loansPolicy.period.intervalId}`
            );
          });
        });

        describe('loan due date schedule', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.label.text).to.equal(translation['settings.loanPolicy.fDDSlimit']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.value.text).to.equal('-');
          });
        });
      });


      describe('loan policy:\n\t-loanable\n\t-fixed\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
            loansPolicy: {
              profileId: 'Fixed',
              period: getPeriod,
            },
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('loan period', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.loansSection.loanPeriod.isPresent).to.be.false;
          });
        });

        describe('loan due date schedule', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.label.text).to.equal(translation['settings.loanPolicy.fDDS']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.value.text).to.equal('-');
          });
        });
      });
    });

    describe('renewals section', () => {
      describe('loan policy:\n\t-non loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: false,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });
        describe('renewals section', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-with limited renewals\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            renewalsPolicy: {
              unlimited: false,
              numberAllowed: 666,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('number renewals allowed', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.numRenewalsAllowed.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.numRenewalsAllowed.label.text).to.equal(translation['settings.loanPolicy.numRenewalsAllowed']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.numRenewalsAllowed.value.text).to.equal(loanPolicy.renewalsPolicy.numberAllowed.toString());
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-unlimited renewals\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            renewalsPolicy: {
              unlimited: true,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('number renewals allowed', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.numRenewalsAllowed.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-different period\n\t-rolling\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            loansPolicy: {
              profileId: 'Rolling',
            },
            renewalsPolicy: {
              differentPeriod: true,
              period: getPeriod,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('alternate loan period renewals', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateLoanPeriodRenewals.label.text).to.equal(translation['settings.loanPolicy.alternateLoanPeriodRenewals']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateLoanPeriodRenewals.value.text).to.equal(
              `${loanPolicy.renewalsPolicy.period.duration} ${loanPolicy.renewalsPolicy.period.intervalId}`
            );
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-same period\n\t-rolling\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            loansPolicy: {
              profileId: 'Rolling',
            },
            renewalsPolicy: {
              differentPeriod: false,
              period: getPeriod,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('alternate loan period renewals', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('header', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyDetail.renewalsSection.header.text).to.equal(translation['settings.loanPolicy.renewals']);
          });
        });

        describe('unlimited renewals', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.unlimitedRenewals.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.unlimitedRenewals.label.text).to.equal(translation['settings.loanPolicy.unlimitedRenewals']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.unlimitedRenewals.value.text).to.equal(
              getBooleanRepresentation(loanPolicy.renewalsPolicy.unlimited)
            );
          });
        });

        describe('renew from', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.renewFrom.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.renewFrom.label.text).to.equal(translation['settings.loanPolicy.renewFrom']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.renewFrom.value.text).to.equal(
              getOptionsRepresentation(renewFromOptions, loanPolicy.renewalsPolicy.renewFromId)
            );
          });
        });

        describe('renewal period different', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.renewalPeriodDifferent.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.renewalPeriodDifferent.label.text).to.equal(translation['settings.loanPolicy.renewalPeriodDifferent']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.renewalPeriodDifferent.value.text).to.equal(
              getBooleanRepresentation(loanPolicy.renewalsPolicy.differentPeriod)
            );
          });
        });
      });
    });
  });
});
