/* eslint-disable ui-testing/no-disabled-tests */
describe('Wallet App Test Cases', () => {
  let startTime;

  context('Setting up accounts', () => {
    it('should set up wallets for two members of the econ committee.', () => {
      cy.setupWallet({
        secretWords:
          'such field health riot cost kitten silly tube flash wrap festival portion imitate this make question host bitter puppy wait area glide soldier knee',
        walletName: 'gov2',
      });
      cy.setupWallet({
        secretWords:
          'physical immune cargo feel crawl style fox require inhale law local glory cheese bring swear royal spy buyer diesel field when task spin alley',
        walletName: 'gov1',
      });
      cy.setupWallet({
        secretWords:
          'tackle hen gap lady bike explain erode midnight marriage wide upset culture model select dial trial swim wood step scan intact what card symptom',
        walletName: 'user1',
      });
    });

    it('should connect with chain and wallet', () => {
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');
      cy.acceptAccess();
    });
  });

  context('Adjusting Vault Params', () => {
    it('should allow gov1 to create a proposal', () => {
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');
      cy.acceptAccess();

      cy.get('button').contains('Vaults').click();
      cy.get('button').contains('Select Manager').click();
      cy.get('button').contains('manager0').click();

      cy.get('label')
        .contains('LiquidationMargin')
        .parent()
        .within(() => {
          cy.get('input').clear().type('150');
        });

      cy.get('label')
        .contains('LiquidationPadding')
        .parent()
        .within(() => {
          cy.get('input').clear().type('25');
        });

      cy.get('label')
        .contains('LiquidationPenalty')
        .parent()
        .within(() => {
          cy.get('input').clear().type('1');
        });

      cy.get('label')
        .contains('StabilityFee')
        .parent()
        .within(() => {
          cy.get('input').clear().type('1');
        });

      cy.get('label')
        .contains('MintFee')
        .parent()
        .within(() => {
          cy.get('input').clear().type('0.5');
        });

      cy.get('label')
        .contains('Minutes until close of vote')
        .parent()
        .within(() => {
          cy.get('input').clear().type(1);
        });
      cy.get('[value="Propose Parameter Change"]').click();

      cy.confirmTransaction();
      cy.get('p')
        .contains('sent')
        .should('be.visible')
        .then(() => {
          startTime = Date.now();
        });
    });

    it('should allow gov1 to vote on the proposal', () => {
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');

      cy.get('button').contains('Vote').click();
      cy.get('p').contains('YES').click();
      cy.get('input:enabled[value="Submit Vote"]').click();

      cy.confirmTransaction();
      cy.get('p').contains('sent').should('be.visible');
    });

    it('should allow gov2 to vote on the proposal', () => {
      cy.switchWallet('gov2');
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');

      cy.get('button').contains('Vote').click();
      cy.get('p').contains('YES').click();
      cy.get('input:enabled[value="Submit Vote"]').click();

      cy.confirmTransaction();
      cy.get('p').contains('sent').should('be.visible');
    });

    it('should wait for proposal to pass', () => {
      cy.wait(60000 - Date.now() + startTime);
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');

      cy.get('button').contains('History').click();

      cy.get('code')
        .contains('VaultFactory - ATOM')
        .parent()
        .parent()
        .parent()
        .within(() => {
          cy.get('span').contains('Change Accepted').should('be.visible');
        });
    });
  });

  context('Adjusting Auction Params', () => {
    it('should allow gov2 to create a proposal', () => {
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');

      cy.get('button').contains('Vaults').click();
      cy.get('button').contains('Change Manager Params').click();
      cy.get('button').contains('Change Auctioneer Params').click();

      cy.get('label')
        .contains('StartingRate')
        .parent()
        .within(() => {
          cy.get('input').clear().type('105');
        });

      cy.get('label')
        .contains('LowestRate')
        .parent()
        .within(() => {
          cy.get('input').clear().type('65');
        });

      cy.get('label')
        .contains('DiscountStep')
        .parent()
        .within(() => {
          cy.get('input').clear().type('5');
        });

      cy.get('label')
        .contains('AuctionStartDelay')
        .parent()
        .within(() => {
          cy.get('input').clear().type('2');
        });

      cy.get('label')
        .contains('StartFrequency')
        .parent()
        .within(() => {
          cy.get('input').clear().type('60');
        });

      cy.get('label')
        .contains('PriceLockPeriod')
        .parent()
        .within(() => {
          cy.get('input').clear().type('30');
        });

      cy.get('label')
        .contains('Minutes until close of vote')
        .parent()
        .within(() => {
          cy.get('input').clear().type(1);
        });
      cy.get('[value="Propose Parameter Change"]').click();

      cy.confirmTransaction();
      cy.get('p')
        .contains('sent')
        .should('be.visible')
        .then(() => {
          startTime = Date.now();
        });
    });

    it('should allow gov2 to vote on the proposal', () => {
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');

      cy.get('button').contains('Vote').click();
      cy.get('p').contains('YES').click();
      cy.get('input:enabled[value="Submit Vote"]').click();

      cy.confirmTransaction();
      cy.get('p').contains('sent').should('be.visible');
    });

    it('should allow gov1 to vote on the proposal', () => {
      cy.switchWallet('gov1');
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');

      cy.get('button').contains('Vote').click();
      cy.get('p').contains('YES').click();
      cy.get('input:enabled[value="Submit Vote"]').click();

      cy.confirmTransaction();
      cy.get('p').contains('sent').should('be.visible');
    });

    it('should wait for proposal to pass', () => {
      cy.wait(60000 - Date.now() + startTime);
      cy.visit('https://econ-gov.inter.trade/?agoricNet=local');

      cy.get('button').contains('History').click();

      cy.get('code')
        .contains('VaultFactory - ATOM')
        .parent()
        .parent()
        .parent()
        .within(() => {
          cy.get('span').contains('Change Accepted').should('be.visible');
        });
    });
  });

  context('Creating vaults and adjusting ATOM value', () => {
    it('switch to user1 wallet', () => {
      cy.switchWallet('user1');
    });
    it('should navigate to Vaults UI, setup connection settings and connect with chain', () => {
      cy.visit(
        'https://bafybeifekj7jtnir5gm2qh5gkltbkc3yoqluzujdgsmhgynlzbc5tfhm3m.ipfs.cf-ipfs.com/#/vaults',
      );
      cy.get('button[aria-label="Settings"]').click();

      cy.contains('p', 'RPC Endpoint:')
        .next('div')
        .find('input')
        .clear({ force: true })
        .then(() => {
          cy.wait(3000);
          cy.contains('p', 'RPC Endpoint:')
            .next('div')
            .find('input')
            .invoke('val', '')
            .type('http://localhost:26657');
        });
      cy.contains('li', 'Add "http://localhost:26657"').click();

      cy.contains('p', 'API Endpoint:')
        .next('div')
        .find('input')
        .clear({ force: true })
        .then(() => {
          cy.wait(3000);
          cy.contains('p', 'API Endpoint:')
            .next('div')
            .find('input')
            .invoke('val', '')
            .type('http://localhost:1317');
        });
      cy.contains('li', 'Add "http://localhost:1317"').click();

      cy.contains('button', 'Save').click();
      cy.contains('button', 'Connect Wallet').click();
      cy.get('label.cursor-pointer input[type="checkbox"]').check();
      cy.contains('Proceed').click();

      cy.acceptAccess();
      cy.acceptAccess();
    });
    it('should set ATOM price to 12.34', () => {
      cy.exec('bash ./test/e2e/test-scripts/set-oracle-price.sh 12.34').then(
        (result) => {
          expect(result.stderr).to.contain('');
          expect(result.stdout).to.contain('Success: Price set to 12.34');
        },
      );
    });
    it('should create a vault minting 100 ISTs and submitting 15 ATOMs as collateral', () => {
      cy.exec('bash ./test/e2e/test-scripts/create-vaults.sh 100 15', {
        failOnNonZeroExit: false,
        timeout: 120000,
      }).then((result) => {
        expect(result.stderr).to.contain('');
        expect(result.stdout).not.to.contain('Error');
      });
    });

    it('should create a vault minting 103 ISTs and submitting 15 ATOMs as collateral', () => {
      cy.exec('bash ./test/e2e/test-scripts/create-vaults.sh 103 15', {
        failOnNonZeroExit: false,
        timeout: 120000,
      }).then((result) => {
        expect(result.stderr).to.contain('');
        expect(result.stdout).not.to.contain('Error');
      });
    });

    it('should create a vault minting 105 ISTs and submitting 15 ATOMs as collateral', () => {
      cy.exec('bash ./test/e2e/test-scripts/create-vaults.sh 105 15', {
        failOnNonZeroExit: false,
        timeout: 120000,
      }).then((result) => {
        expect(result.stderr).to.contain('');
        expect(result.stdout).not.to.contain('Error');
      });
    });

    it('should check for the existence of vaults on the UI', () => {
      cy.contains('button', 'Back to vaults').click();
      cy.contains('#8').should('exist');
      cy.contains('#9').should('exist');
      cy.contains('#10').should('exist');
    });
  });

  context('Place bids and make all vaults enter liquidation', () => {
    it('should connect with keplr wallet and succeed in provisioning a new wallet', () => {
      cy.visit('/wallet/');

      cy.get('input.PrivateSwitchBase-input').click();
      cy.contains('Proceed').click();

      cy.get('button[aria-label="Settings"]').click();

      cy.get('#demo-simple-select').click();
      cy.get('li[data-value="local"]').click();
      cy.contains('button', 'Connect').click();

      cy.acceptAccess().then((taskCompleted) => {
        expect(taskCompleted).to.be.true;
      });

      cy.reload();

      cy.get('span').contains('ATOM').should('exist');
      cy.get('span').contains('BLD').should('exist');
    });
    it('should place bids from the CLI successfully', () => {
      cy.switchWallet('gov2');
      cy.addNewTokensFound();
      cy.getTokenAmount('IST').then((initialTokenValue) => {
        cy.exec('bash ./test/e2e/test-scripts/place-bids.sh', {
          failOnNonZeroExit: false,
        }).then((result) => {
          const regex = /Bid Placed Successfully/g;
          const matches = result.stdout.match(regex);
          expect(matches).to.have.lengthOf(3);
          cy.getTokenAmount('IST').then((tokenValue) => {
            expect(tokenValue).to.lessThan(initialTokenValue);
          });
        });
      });
    });

    it('should see an bids placed in the previous test case', () => {
      cy.contains('Offer').should('be.visible');
      cy.contains('Give Bid').should('be.visible');
      cy.contains('from IST').should('be.visible');
      cy.contains('Arguments').should('be.visible');
      cy.contains('0.10 IST').should('be.visible');
      cy.contains('0.15 IST').should('be.visible');
      cy.contains('0.20 IST').should('be.visible');
    });

    it('should set ATOM price to 9.99', () => {
      cy.exec('bash ./test/e2e/test-scripts/set-oracle-price.sh 9.99').then(
        (result) => {
          expect(result.stderr).to.contain('');
          expect(result.stdout).to.contain('Success: Price set to 9.99');
        },
      );
    });

    it('switch to user1 wallet', () => {
      cy.switchWallet('user1');
    });

    it('should verify vaults that are at a risk of being liquidated', () => {
      cy.visit(
        'https://bafybeifekj7jtnir5gm2qh5gkltbkc3yoqluzujdgsmhgynlzbc5tfhm3m.ipfs.cf-ipfs.com/#/vaults',
      );
      cy.contains(
        /Please increase your collateral or repay your outstanding IST debt./,
      );
    });
  });
});
