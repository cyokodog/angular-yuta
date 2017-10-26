interface AdaptedAuth {
  authenticated: boolean;
  userName: string;
  photoURL: string;
}

export class Auth {

  static blank(): Auth {
    return new Auth({
      authenticated: false,
      userName: null,
      photoURL: null,
    });
  }

  constructor(
    private item: AdaptedAuth
  ) {
  }

  set authenticated(v: boolean) {
    this.item.authenticated = v;
  }

  get authenticated(): boolean {
    return this.item.authenticated;
  }

  set userName(v: string) {
    this.item.userName = v;
  }

  get userName(): string {
    return this.item.userName;
  }

  get photoURL(): string {
    return this.item.photoURL;
  }

}
