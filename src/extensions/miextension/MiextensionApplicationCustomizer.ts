import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import { Log } from "@microsoft/sp-core-library";
import * as strings from "MiextensionApplicationCustomizerStrings";
const LOG_SOURCE: string = "CustomizersApplicationCustomizer";

export interface IMiextensionApplicationCustomizerProperties {
  testMessage: string;
}

export default class MiextensionApplicationCustomizer extends BaseApplicationCustomizer<IMiextensionApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceHolders
    );

    return Promise.resolve();
  }

  private _onDispose(): void {}

  private _renderPlaceHolders(): void {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      if (this._topPlaceholder.domElement) {
        // const top: React.ReactElement<ITopReactProps> =
        //   React.createElement(TopReact);

        // ReactDOM.render(top, this._topPlaceholder.domElement);
        this._topPlaceholder.domElement.innerHTML = `
        <div> Top placeholder</div>
        `;
      }
    }
  }
}
