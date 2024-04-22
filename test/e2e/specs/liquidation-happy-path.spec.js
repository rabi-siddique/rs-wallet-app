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
    it('should setup wallet using 24 word phrase', () => {
      cy.setupWallet({
        secretWords:
          'tackle hen gap lady bike explain erode midnight marriage wide upset culture model select dial trial swim wood step scan intact what card symptom',
        password: 'Test1234',
        newAccount: true,
        walletName: 'My Wallet 2',
      }).then((setupFinished) => {
        expect(setupFinished).to.be.true;
      });
    });

    it('should navigate to Vaults UI, setup connection settings and connect with chain', () => {
      cy.visit(
        'https://bafybeidafiu4scsvzjshz4zlaqilb62acjzwhf4np4qw7xzrommn3jkgti.ipfs.cf-ipfs.com/#/vaults',
      );

      cy.get('button[aria-label="Settings"]').click();

      cy.contains('p', 'RPC Endpoint:')
        .next('div')
        .find('input')
        .clear()
        .type('http://localhost:26657');

      cy.contains('li', 'Add "http://localhost:26657"').click();

      cy.contains('p', 'API Endpoint:')
        .next('div')
        .find('input')
        .clear()
        .type('http://localhost:1317');

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

    it('should create 3 vaults from the CLI successfully', () => {
      cy.exec('bash ./test/e2e/test-scripts/create-vaults.sh').then(
        (result) => {
          const regex = /Vault created successfully/g;
          const matches = result.stdout.match(regex);
          expect(matches).to.have.lengthOf(3);
        },
      );
    });
  });
});
