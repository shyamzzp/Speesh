# Home-manager module for Speesh speech-to-text
#
# Provides a systemd user service for autostart.
# Usage: imports = [ speesh.homeManagerModules.default ];
#        services.speesh.enable = true;
{
  config,
  lib,
  pkgs,
  ...
}:
let
  cfg = config.services.speesh;
in
{
  options.services.speesh = {
    enable = lib.mkEnableOption "Speesh speech-to-text user service";

    package = lib.mkOption {
      type = lib.types.package;
      defaultText = lib.literalExpression "speesh.packages.\${system}.speesh";
      description = "The Speesh package to use.";
    };
  };

  config = lib.mkIf cfg.enable {
    systemd.user.services.speesh = {
      Unit = {
        Description = "Speesh speech-to-text";
        After = [ "graphical-session.target" ];
        PartOf = [ "graphical-session.target" ];
      };
      Service = {
        ExecStart = "${cfg.package}/bin/speesh";
        Restart = "on-failure";
        RestartSec = 5;
      };
      Install.WantedBy = [ "graphical-session.target" ];
    };
  };
}
